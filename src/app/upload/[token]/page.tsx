"use client";

import * as React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileDropZone } from "@/components/upload/file-drop-zone";

export default function UploadPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const storageNamespace = params.token as string;
  const retailerName = searchParams.get("name") || storageNamespace;

  const [ordersUploaded, setOrdersUploaded] = React.useState(false);
  const [productsUploaded, setProductsUploaded] = React.useState(false);

  const isComplete = ordersUploaded;

  // Complete state
  if (isComplete) {
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
              Thank you{retailerName !== storageNamespace ? `, ${retailerName}` : ""}. Your data has been uploaded successfully.
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
              <p>Questions? Contact us at <a href="mailto:support@cruxible.ai" className="text-primary hover:underline">support@cruxible.ai</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Upload form
  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Data Upload</h1>
          <p className="text-muted-foreground">
            {retailerName !== storageNamespace
              ? `Welcome, ${retailerName}! Please upload your Shopify export files.`
              : "Please upload your Shopify export files."}
          </p>
        </div>

        {/* Main upload card */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Files</CardTitle>
            <CardDescription>
              We need your Shopify orders export to analyze your promotions.
              Products export is optional but enables margin calculations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Orders upload */}
            <FileDropZone
              label="Orders Export"
              description="Shopify Admin → Orders → Export → All orders → CSV"
              required
              storageNamespace={storageNamespace}
              fileType="orders"
              onUploadComplete={() => setOrdersUploaded(true)}
              onUploadError={(err) => console.error("Orders upload error:", err)}
            />

            {/* Products upload */}
            <FileDropZone
              label="Products Export"
              description="Shopify Admin → Products → Export → All products → CSV"
              required={false}
              storageNamespace={storageNamespace}
              fileType="products"
              onUploadComplete={() => setProductsUploaded(true)}
              onUploadError={(err) => console.error("Products upload error:", err)}
            />

            {/* Upload status summary */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Orders:</span>
                <span className={ordersUploaded ? "text-success font-medium" : "text-muted-foreground"}>
                  {ordersUploaded ? "Uploaded" : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Products:</span>
                <span className={productsUploaded ? "text-success font-medium" : "text-muted-foreground"}>
                  {productsUploaded ? "Uploaded" : "Not uploaded (optional)"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              <strong>Orders Export:</strong> Go to Shopify Admin → Orders → Export.
              Select &quot;All orders&quot; and choose &quot;Plain CSV file&quot;.
            </p>
            <p>
              <strong>Products Export:</strong> Go to Shopify Admin → Products → Export.
              Select &quot;All products&quot; and choose &quot;Plain CSV file&quot;.
            </p>
            <p>
              For best results, include at least 12 months of order history.
            </p>
            <p className="pt-2">
              Questions? Email us at{" "}
              <a href="mailto:support@cruxible.ai" className="text-primary hover:underline">
                support@cruxible.ai
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
