"use client";

import { usePathname } from "next/navigation";

import { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Discover from "./discover/Discover";

type Props = {
  children: ReactNode;
};

export default function BodyWrapper({ children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <main className="antialiased relative">
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Discover />}
      {!isAdmin && <Footer />}
    </main>
  );
}
