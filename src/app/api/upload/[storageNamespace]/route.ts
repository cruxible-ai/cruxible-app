import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

// POST /api/upload/[storageNamespace] - Upload a file
export async function POST(
  request: NextRequest,
  { params }: { params: { storageNamespace: string } }
) {
  try {
    const supabase = getSupabaseClient();
    const { storageNamespace } = params;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileType = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!fileType || !["orders", "products", "supporting"].includes(fileType)) {
      return NextResponse.json(
        { error: "type must be 'orders', 'products', or 'supporting'" },
        { status: 400 }
      );
    }

    // Upload file to Supabase Storage using original filename with timestamp prefix
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const storagePath = `${storageNamespace}/${fileType}/${timestamp}-${safeName}`;
    const buffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("retailer-uploads")
      .upload(storagePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: `Failed to upload file: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Look up merchant by storage_namespace and insert upload record
    const { data: merchant, error: merchantError } = await supabase
      .from("merchants")
      .select("id")
      .eq("storage_namespace", storageNamespace)
      .maybeSingle();

    if (merchantError) {
      console.error("Merchant lookup error:", merchantError);
    }

    if (merchant) {
      const { error: insertError } = await supabase.from("uploads").insert({
        merchant_id: merchant.id,
        file_type: fileType,
        file_name: file.name,
        storage_path: storagePath,
        status: "uploaded",
      });

      if (insertError) {
        console.error("Upload record insert error:", insertError);
      }
    }

    return NextResponse.json({
      success: true,
      path: storagePath,
      message: `${fileType} file uploaded successfully`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
