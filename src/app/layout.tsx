import type { Metadata, Viewport } from "next";
import fs from "fs";
import path from "path";
import ClientInteractions from "@/components/ClientInteractions";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://brandinning.com"),
  title: "Brandinning — Create your finest digital image",
  description: "Brandinning — Digital Marketing Agency. We turn experiences into solutions!",
  icons: {
    icon: [
      { url: "/wp-content/themes/choicy/assets/img/favicon.webp", type: "image/webp" },
      { url: "/wp-content/uploads/2025/07/cropped-Logo3-scaled-1-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/wp-content/uploads/2025/07/cropped-Logo3-scaled-1-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/wp-content/uploads/2025/07/cropped-Logo3-scaled-1-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headStylesPath = path.join(process.cwd(), "public", "head-styles.html");
  const headStyles = fs.existsSync(headStylesPath)
    ? fs.readFileSync(headStylesPath, "utf8")
    : "";

  return (
    <html lang="en-US">
      <head dangerouslySetInnerHTML={{ __html: headStyles }} />
      <body className="home wp-singular page-template page-template-elementor_header_footer page page-id-9298 wp-embed-responsive wp-theme-choicy no-sidebar elementor-default elementor-template-full-width elementor-kit-6 elementor-page elementor-page-9298">
        <ClientInteractions />
        {children}
      </body>
    </html>
  );
}
