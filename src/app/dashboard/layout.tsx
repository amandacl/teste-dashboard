"use client";
import HeaderPanel from "../components/header-panel-component";
import Footer from "../components/footer.component";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "../components/sidebar.component";

export interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const token = window?.sessionStorage.getItem("token");

  const pathname = usePathname();
  const pageName = pathname.split("/").filter((part) => part !== "")[1];
  const headerTitle = `Requisições de ${pageName}`;
  if (!token) redirect("/");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside className={isSidebarOpen ? "w-1/5" : "w-1/10"}>
          <Sidebar
            handleSidebarToggle={handleSidebarToggle}
            isSidebarOpen={isSidebarOpen}
          />
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden">
          <HeaderPanel title={headerTitle} />

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
