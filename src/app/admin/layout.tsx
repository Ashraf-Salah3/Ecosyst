"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarPage from "./_slideBar/page";

interface AdminProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div>
      {/* Sidebar */}
      <div className="sticky top-0 z-50 ">
        <SidebarPage />
      </div>

      {/* Main Content */}
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
