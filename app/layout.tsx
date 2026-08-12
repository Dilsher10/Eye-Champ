import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eye Champ | Eyewear for Everyone",
  description: "Shop eyeglasses, sunglasses and premium frames for every style.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
