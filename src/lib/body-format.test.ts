import { describe, expect, it } from "vitest";
import { bodyFormat, extensionFor, looksLikeHtml, looksLikeMarkdown, SANDBOX_CSP, sandboxSrcDoc, sanitizeHtml } from "./body-format";

const text = (value: string, json?: unknown) => ({ text: value, json });
const none = { contentType: null, name: null };

describe("body formats", () => {
  it("takes the declared type first, then the name's extension, then JSON, then a confident sniff", () => {
    expect(bodyFormat(text("plain"), { contentType: "text/markdown; charset=utf-8", name: null })).toBe("markdown");
    expect(bodyFormat(text("plain"), { contentType: "text/html", name: "notes.md" })).toBe("html");
    expect(bodyFormat(text("plain"), { contentType: null, name: "docs/design.markdown" })).toBe("markdown");
    expect(bodyFormat(text("plain"), { contentType: "text/plain", name: "https://example.test/page.htm?x=1#top" })).toBe("html");
    expect(bodyFormat(text('{"a":1}', { a: 1 }), { contentType: "application/json", name: null })).toBe("json");
    expect(bodyFormat(text('{"a":1}', { a: 1 }), none)).toBe("json");
    expect(bodyFormat(text("<!DOCTYPE html><title>x</title>"), none)).toBe("html");
    expect(bodyFormat(text("# Design\n\n- one\n- two\n"), none)).toBe("markdown");
    expect(bodyFormat(text("# Design\n\n- one\n"), { contentType: "text/plain", name: null })).toBe("markdown");
    expect(bodyFormat({ text: null, json: undefined }, { contentType: "text/markdown", name: null })).toBe("binary");
  });

  it("does not sniff past what the type says, and shows anything unsure as text", () => {
    // a server that says text/plain is believed about HTML (the source is what it sent)
    expect(bodyFormat(text("<html><body>x</body></html>"), { contentType: "text/plain", name: null })).toBe("text");
    // a declared non-text type is never sniffed as markdown
    expect(bodyFormat(text("# a\n- b\n"), { contentType: "text/csv", name: null })).toBe("text");
    expect(bodyFormat(text("line one\nline two"), none)).toBe("text");
    // one construct is not confident: a lone hash line is often a comment
    expect(bodyFormat(text("# not a heading, a comment\nkey=value\n"), none)).toBe("text");
  });

  it("sniffs HTML only from a document's own opening, and markdown only from two constructs outside markup", () => {
    expect(looksLikeHtml("﻿  <html lang=en>")).toBe(true);
    expect(looksLikeHtml("<p>a fragment</p>")).toBe(false);
    expect(looksLikeHtml("<?xml version='1.0'?><html/>")).toBe(false);
    expect(looksLikeMarkdown("Intro with a [link](https://example.test) and **bold** words.")).toBe(true);
    expect(looksLikeMarkdown("| a | b |\n|---|---|\n| 1 | 2 |\n\n> quoted")).toBe(true);
    expect(looksLikeMarkdown("```\ncode\n```\n1. first")).toBe(true);
    expect(looksLikeMarkdown("<div>\n# x\n- y\n</div>")).toBe(false);
    expect(looksLikeMarkdown("a * b * c")).toBe(false);
  });

  it("names downloads by format", () => {
    expect(extensionFor("markdown", null)).toBe("md");
    expect(extensionFor("html", "text/html")).toBe("html");
    expect(extensionFor("json", null)).toBe("json");
    expect(extensionFor("text", "application/xml")).toBe("xml");
    expect(extensionFor("text", "text/csv")).toBe("txt");
    expect(extensionFor("binary", "application/pdf")).toBe("bin");
  });
});

describe("sanitized HTML", () => {
  const hostile = `<!doctype html><html><head>
    <meta http-equiv="refresh" content="0;url=https://evil.test">
    <base href="https://evil.test/">
    <link rel="stylesheet" href="https://evil.test/x.css">
    <script>window.parent.alert(1)</script>
    <style>p{color:red}</style>
  </head><body onload="alert(2)">
    <p onclick="alert(3)">Patched in 1.2.</p>
    <a href="java\tscript:alert(4)">bad</a>
    <a href="https://example.test/advisory">ok</a>
    <a href="database.html">relative</a>
    <img src="data:image/png;base64,AAAA" alt="inline">
    <img src="data:text/html;base64,PHNjcmlwdD4=" alt="smuggled">
    <iframe src="https://evil.test"></iframe><object data="x.swf"></object><embed src="x.swf">
    <form action="javascript:alert(5)"><button formaction="javascript:alert(6)">go</button></form>
  </body></html>`;

  it("drops what runs, embeds or redirects, and every handler and script URL; keeps the rest", () => {
    const doc = sanitizeHtml(hostile);
    expect(doc.querySelectorAll("script, meta, base, link, iframe, object, embed")).toHaveLength(0);
    const all = Array.from(doc.querySelectorAll("*"));
    expect(all.flatMap((el) => el.getAttributeNames()).filter((name) => name.startsWith("on"))).toEqual([]);
    const links = Array.from(doc.querySelectorAll("a"));
    expect(links.map((a) => a.getAttribute("href"))).toEqual([null, "https://example.test/advisory", "database.html"]);
    const images = Array.from(doc.querySelectorAll("img"));
    expect(images.map((img) => img.getAttribute("src"))).toEqual(["data:image/png;base64,AAAA", null]);
    expect(doc.querySelector("form")!.hasAttribute("action")).toBe(false);
    expect(doc.querySelector("button")!.hasAttribute("formaction")).toBe(false);
    expect(doc.querySelector("style")!.textContent).toBe("p{color:red}");
    expect(doc.body.textContent).toContain("Patched in 1.2.");
  });

  it("puts the no-remote policy first in the frame's document", () => {
    const srcDoc = sandboxSrcDoc(hostile);
    const doc = new DOMParser().parseFromString(srcDoc, "text/html");
    const first = doc.head.firstElementChild!;
    expect(first.getAttribute("http-equiv")).toBe("Content-Security-Policy");
    expect(first.getAttribute("content")).toBe(SANDBOX_CSP);
    expect(SANDBOX_CSP).toContain("default-src 'none'");
    expect(srcDoc).not.toMatch(/<script|onload=|onclick=|evil\.test\/x\.css|http-equiv="refresh"/i);
    // a fragment becomes a whole document
    expect(sandboxSrcDoc("<p>Fragment</p>")).toMatch(/^<!doctype html><html><head><meta http-equiv="Content-Security-Policy"/);
  });
});
