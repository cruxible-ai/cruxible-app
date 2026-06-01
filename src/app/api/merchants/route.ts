import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

// POST /api/merchants — Create or return existing merchant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactName, contactEmail, companyName, platform } = body;

    // Validate required fields
    if (!contactEmail || !companyName || !platform) {
      return NextResponse.json(
        { error: "contactEmail, companyName, and platform are required" },
        { status: 400 }
      );
    }

    const validPlatforms = ["shopify", "woocommerce", "netsuite", "bigcommerce", "other"];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: `platform must be one of: ${validPlatforms.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    // Check for existing merchant by email + company (idempotent)
    const { data: existing, error: lookupError } = await supabase
      .from("merchants")
      .select("id, storage_namespace")
      .eq("contact_email", contactEmail)
      .eq("company_name", companyName)
      .maybeSingle();

    if (lookupError) {
      console.error("Merchant lookup error:", lookupError);
      return NextResponse.json(
        { error: "Failed to check for existing merchant" },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json({
        merchantId: existing.id,
        storageNamespace: existing.storage_namespace,
      });
    }

    // Generate storage namespace: {8-char-uuid}-{company-slug}
    const shortId = crypto.randomUUID().slice(0, 8);
    const companySlug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);
    const storageNamespace = `${shortId}-${companySlug}`;

    const { data: merchant, error: insertError } = await supabase
      .from("merchants")
      .insert({
        contact_name: contactName || null,
        contact_email: contactEmail,
        company_name: companyName,
        platform,
        storage_namespace: storageNamespace,
      })
      .select("id, storage_namespace")
      .single();

    if (insertError) {
      console.error("Merchant insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create merchant" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      merchantId: merchant.id,
      storageNamespace: merchant.storage_namespace,
    });
  } catch (error) {
    console.error("Error creating merchant:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
