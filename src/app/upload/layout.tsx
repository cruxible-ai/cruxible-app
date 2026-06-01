import type { Metadata } from "next";
import { ForceDarkMode } from "@/components/theme/force-dark-mode";

export const metadata: Metadata = {
  title: "Get Started: Cruxible",
  description: "Upload your e-commerce data to get started with Cruxible",
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ForceDarkMode />
      {children}
    </>
  );
}
