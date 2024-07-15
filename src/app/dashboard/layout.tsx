"use client";
import HeaderPanel from "../components/header-panel-component";
import { Sidebar } from "lucide-react";
import Footer from "../components/footer.component";
import { redirect, usePathname } from "next/navigation";
import { sessionService } from "../services/user.service";
import { useEffect, useState } from "react";

export interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const userId = window?.sessionStorage.getItem("userId");
  const token = window?.sessionStorage.getItem("token");

  const pathname = usePathname();
  const pageName = pathname.split("/").filter((part) => part !== "")[1];
  const headerTitle = `Requisições de ${pageName}`
  if (!token) redirect("/");

  const [name, setName] = useState("");

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

  useEffect(() => {
    userName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      <header className="col-span-12 h-10">
        <HeaderPanel name={name} title={headerTitle} />
      </header>

      <aside className="col-span-2 bg-gray-200 h-full">
        <Sidebar />
      </aside>

      <main className="col-span-8 bg-white p-4 h-full">
        <div className="h-full">{children}</div>
      </main>
      <footer className="col-span-12 h-10">
        <Footer />
      </footer>
    </div>
  );
}
