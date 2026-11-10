import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandinning — Create your finest digital image",
  description: "Brandinning — Digital Marketing Agency. We turn experiences into solutions!",
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
        {children}
      </body>
    </html>
  );
}
