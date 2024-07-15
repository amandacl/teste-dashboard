"use client";
import HeaderPanel from "../components/header-panel-component";
import { Sidebar } from "lucide-react";
import Footer from "../components/footer.component";
import { useAuth } from "../context/auth-context";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  console.log("auth", isAuthenticated);
  if (!isAuthenticated) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen">
      <header className="col-span-12 bg-gray-800 text-white py-4">
        <HeaderPanel />
      </header>

      <aside className="col-span-2 bg-gray-200">
        <Sidebar />
      </aside>

      <main className="col-span-8 bg-white p-4">
        <div className="container mx-auto">{children}</div>
      </main>

      <footer className="col-span-12 bg-gray-800 text-white py-4">
        <Footer />
      </footer>
    </div>
  );
}
