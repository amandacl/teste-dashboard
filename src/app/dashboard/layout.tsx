"use client";
import HeaderPanel from "../components/header-panel-component";
import Footer from "../components/footer.component";
import { redirect, usePathname } from "next/navigation";
import { sessionService } from "../services/user.service";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar.component";

export interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const userId = window?.sessionStorage.getItem("userId");
  const token = window?.sessionStorage.getItem("token");

  const pathname = usePathname();
  const pageName = pathname.split("/").filter((part) => part !== "")[1];
  const headerTitle = `Requisições de ${pageName}`;
  if (!token) redirect("/");

  const [name, setName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userName = async () => {
    if (!userId) return;

    try {
      const response = await sessionService.getUserById(userId);
      setName(response?.name);
      return name;
    } catch (err) {
      console.error(err);
    }
    return name;
  };
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    userName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-rows-10 grid-cols-10  h-screen">
      <aside
        className={
          isSidebarOpen ? "col-span-2 row-span-9" : "col-span-1 row-span-9"
        }
      >
        <Sidebar handleSidebarToggle={handleSidebarToggle}isSidebarOpen={isSidebarOpen} />
      </aside>
      <div className={isSidebarOpen ? "col-span-8 " : "col-span-9 "}>
        <HeaderPanel name={name} title={headerTitle} />
      </div>

      <main className={isSidebarOpen ? "col-span-8 " : "col-span-9 row-span-9"}>
        {children}
      </main>
      <footer className="col-span-10 row-span-1">
        <Footer />
      </footer>
    </div>
  );
}
