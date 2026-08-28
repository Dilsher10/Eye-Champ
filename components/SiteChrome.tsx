"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLensSelection = pathname.startsWith("/product/select-lenses");

  return <>
    {!isLensSelection && <><Topbar /><Navbar /></>}
    {children}
    {!isLensSelection && <Footer />}
  </>;
}
