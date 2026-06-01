import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cruxible",
  description: "Entity graphs, deterministic execution, and DAG-based receipts.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

// Inline script to set dark mode before React hydrates (prevents flash)
const darkModeScript = `
(function() {
  var path = window.location.pathname;
  if (path === '/' || path.startsWith('/upload') || path.startsWith('/landing') || path.startsWith('/reports') || path.startsWith('/solutions') || path.startsWith('/contact') || path.startsWith('/privacy') || path.startsWith('/terms')) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
