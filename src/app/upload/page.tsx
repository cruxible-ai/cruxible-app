"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Upload, Cpu, FileText, ShieldCheck, Lock, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FileDropZone } from "@/components/upload/file-drop-zone";
import { AuditForm } from "@/components/marketing/audit-form";

type Platform = "shopify" | "woocommerce" | "netsuite" | "bigcommerce" | "other";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-accent/50 transition-colors"
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

const PLATFORM_LABELS: Record<Platform, string> = {
  shopify: "Shopify",
  woocommerce: "WooCommerce",
  netsuite: "NetSuite",
  bigcommerce: "BigCommerce",
  other: "Other",
};

function ShopifyInstructions() {
  return (
    <div className="space-y-3">
      <Collapsible title="How to export Orders">
        <div className="space-y-3 text-sm">
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Go to <strong className="text-foreground">Shopify Admin &rarr; Orders</strong></li>
            <li>Click <strong className="text-foreground">Export</strong></li>
            <li>Select <strong className="text-foreground">All orders</strong> (12+ months is ideal, 6 months minimum)</li>
            <li>Choose <strong className="text-foreground">Plain CSV file</strong></li>
            <li>Click <strong className="text-foreground">Export orders</strong></li>
          </ol>
          <div className="pt-3 border-t">
            <p className="font-medium text-foreground mb-2">What we use from this file:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
              <span>Created at</span><span>Order date</span>
              <span>Lineitem sku</span><span>Product identification</span>
              <span>Lineitem quantity</span><span>Units sold</span>
              <span>Lineitem price</span><span>Sale price</span>
              <span>Lineitem discount</span><span>Discount amount (preferred)</span>
              <span>Lineitem compare at price</span><span>Original price (fallback)</span>
              <span>Discount Code</span><span>Groups orders by promotion</span>
              <span>Name</span><span>Order ID (for basket analysis)</span>
              <span>Location</span><span>Store location (if multi-store)</span>
            </div>
          </div>
        </div>
      </Collapsible>

      <Collapsible title="How to export Products">
        <div className="space-y-3 text-sm">
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Go to <strong className="text-foreground">Shopify Admin &rarr; Products</strong></li>
            <li>Click <strong className="text-foreground">Export</strong></li>
            <li>Select <strong className="text-foreground">All products</strong></li>
            <li>Choose <strong className="text-foreground">Plain CSV file</strong></li>
            <li>Click <strong className="text-foreground">Export products</strong></li>
          </ol>
          <div className="pt-3 border-t">
            <p className="font-medium text-foreground mb-2">What we use from this file:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
              <span>Variant SKU</span><span>Links products to orders</span>
              <span>Cost per item</span><span>Your cost (COGS) for margin/ROI</span>
              <span>Type</span><span>Product category</span>
              <span>Vendor</span><span>Brand/supplier</span>
              <span>Body (HTML)</span><span>Product description</span>
              <span>Tags</span><span>Product attributes</span>
            </div>
          </div>
          <p className="pt-3 border-t text-muted-foreground">
            <strong className="text-foreground">Why descriptions and tags matter:</strong> We use semantic matching to identify product relationships - which products are substitutes (compete with each other) and which are complements (bought together). Richer product info = better insights.
          </p>
        </div>
      </Collapsible>

      <Collapsible title="How we detect promotions">
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">If you use discount codes:</strong> We automatically group sales by code. Each code = one promotion.
          </p>
          <p>
            <strong className="text-foreground">If you don&apos;t use discount codes:</strong> We detect promotions by looking at discounts. We check in this order:
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">Lineitem discount</code> - direct discount amount (best)</li>
            <li><code className="text-xs bg-muted px-1 py-0.5 rounded">Lineitem compare at price</code> vs <code className="text-xs bg-muted px-1 py-0.5 rounded">Lineitem price</code> - we calculate the discount</li>
          </ol>
          <p>
            We group similar discount levels that happen around the same time into promotions.
          </p>
          <p>
            <strong className="text-foreground">Example:</strong> If you ran 20% off Mon-Wed and 30% off Thu-Fri, we&apos;ll detect these as two separate promotions within the same campaign.
          </p>
        </div>
      </Collapsible>

      <Collapsible title="Don't track costs in Shopify?">
        <div className="text-sm text-muted-foreground">
          <p>No problem. You can either:</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Upload a separate spreadsheet with SKU and cost columns using the Supporting Files zone</li>
            <li>Tell us your average margin % and we&apos;ll estimate</li>
          </ol>
        </div>
      </Collapsible>
    </div>
  );
}

function GenericInstructions() {
  return (
    <div className="space-y-3">
      <Collapsible title="CSV data requirements">
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-foreground mb-2">Orders file (required)</p>
            <p className="text-muted-foreground mb-2">Your orders/transactions export should include:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Order date</li>
              <li>SKU or product identifier</li>
              <li>Quantity sold</li>
              <li>Sale price or revenue</li>
              <li>Discount amount or original price (for promo detection)</li>
              <li>Order ID (for basket analysis)</li>
              <li>Discount/promo code (if applicable)</li>
            </ul>
          </div>
          <div className="border-t pt-3">
            <p className="font-medium text-foreground mb-2">Products file (optional, recommended)</p>
            <p className="text-muted-foreground mb-2">Your product catalog should include:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>SKU or product identifier (must match orders file)</li>
              <li>Cost per item (COGS) for margin calculations</li>
              <li>Product category or type</li>
              <li>Product name or description</li>
            </ul>
          </div>
          <div className="border-t pt-3">
            <p className="font-medium text-foreground mb-2">Format tips</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>CSV format preferred (.csv)</li>
              <li>Include column headers in the first row</li>
              <li>12+ months of history is ideal, 6 months minimum</li>
              <li>Dates in any standard format (YYYY-MM-DD, MM/DD/YYYY, etc.)</li>
            </ul>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

export default function UploadPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <UploadPageContent />
    </React.Suspense>
  );
}

function UploadPageContent() {
  const searchParams = useSearchParams();
  const storageNamespace = searchParams.get("ns") || "";
  const platform = (searchParams.get("platform") || "") as Platform | "";

  // If no ns param, auto-open the audit dialog
  const [auditDialogOpen, setAuditDialogOpen] = React.useState(!storageNamespace);

  // Upload tracking
  const [ordersUploaded, setOrdersUploaded] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // If no ns param, show onboarding page with dialog
  if (!storageNamespace) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-xl text-foreground" style={{ fontFamily: 'Merriweather, serif' }}>
                Cruxible
              </span>
            </Link>
            <Button size="sm" onClick={() => setAuditDialogOpen(true)}>
              Get Started
            </Button>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero */}
          <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              See where your promotions are leaking margin
            </h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-xl mx-auto">
              Upload your sales data and we&apos;ll run a promotion post-mortem
              that surfaces hidden profit impact across your catalog.
            </p>
            <Button size="lg" onClick={() => setAuditDialogOpen(true)}>
              Get Started
            </Button>
          </section>

          {/* How it works */}
          <section className="max-w-4xl mx-auto px-6 pb-20">
            <h2 className="text-center text-xl font-medium mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Upload,
                  title: "Upload your data",
                  description: "Export your sales history as CSV. We work with Shopify, WooCommerce, NetSuite, and more.",
                },
                {
                  icon: Cpu,
                  title: "We analyze",
                  description: "We build counterfactual baselines and measure true promo lift across your SKU catalog.",
                },
                {
                  icon: FileText,
                  title: "Get your report",
                  description: "Receive a detailed audit showing which promos drove profit and where margin leaked.",
                },
              ].map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                    <span className="text-primary-foreground font-bold text-lg">{i + 1}</span>
                  </div>
                  <step.icon className="w-7 h-7 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Trust signals */}
          <section className="border-t border-border py-12">
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm font-medium">Encrypted upload</p>
                  <p className="text-xs text-muted-foreground">Your data is encrypted in transit and at rest</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm font-medium">No integrations required</p>
                  <p className="text-xs text-muted-foreground">Just a CSV export — no API keys or account access</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm font-medium">Results in days, not months</p>
                  <p className="text-xs text-muted-foreground">Typical turnaround is 3 business days</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Cruxible</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </footer>

        <AuditForm open={auditDialogOpen} onOpenChange={setAuditDialogOpen} />
      </div>
    );
  }

  // Success screen
  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <svg
                className="h-16 w-16 text-success"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <CardTitle className="text-success">Upload Complete!</CardTitle>
            <CardDescription>
              Your data has been uploaded successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="success">
              <AlertTitle>What happens next?</AlertTitle>
              <AlertDescription>
                We&apos;ll process your data and prepare your promotion analysis report.
                You&apos;ll receive an email when it&apos;s ready.
              </AlertDescription>
            </Alert>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                Questions? Contact us at{" "}
                <a href="mailto:support@cruxible.ai" className="text-primary hover:underline">
                  support@cruxible.ai
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // File upload UI
  const platformLabel = platform && PLATFORM_LABELS[platform] ? PLATFORM_LABELS[platform] : "your";

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-2xl text-foreground" style={{ fontFamily: 'Merriweather, serif' }}>
            Cruxible
          </span>
          <p className="text-muted-foreground">
            Upload {platformLabel !== "your" ? `your ${platformLabel}` : "your"} data to get started
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Your Files</CardTitle>
            <CardDescription>
              {platform === "shopify"
                ? "We need two CSV exports from your Shopify admin to analyze your promotions."
                : "Upload your order history and product catalog for analysis."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FileDropZone
              label="Orders Export"
              description="Required — your sales/order history"
              required
              storageNamespace={storageNamespace}
              fileType="orders"
              onUploadComplete={() => setOrdersUploaded(true)}
              onUploadError={(err) => console.error("Orders upload error:", err)}
            />

            <FileDropZone
              label="Products Export"
              description="Enables margin and ROI calculations"
              required={false}
              storageNamespace={storageNamespace}
              fileType="products"
              onUploadError={(err) => console.error("Products upload error:", err)}
            />

            <FileDropZone
              label="Supporting Files"
              description="e.g., promo calendar, cost data, category mappings"
              required={false}
              multiple
              accept=".csv,.xlsx,.xls,.pdf"
              storageNamespace={storageNamespace}
              fileType="supporting"
              onUploadError={(err) => console.error("Supporting upload error:", err)}
            />

            <Button
              onClick={() => setShowSuccess(true)}
              disabled={!ordersUploaded}
              className="w-full"
              size="lg"
            >
              Complete Upload
            </Button>
          </CardContent>
        </Card>

        {/* Platform-contextual instructions */}
        {platform === "shopify" ? <ShopifyInstructions /> : <GenericInstructions />}

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Need help? Email us at{" "}
            <a href="mailto:support@cruxible.ai" className="text-primary hover:underline">
              support@cruxible.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
