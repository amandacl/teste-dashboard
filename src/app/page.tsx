"use client";
import "./styles/globals.css";
import UserPcImage from "@public/images/hero-illustration.svg";
import { useRouter } from "next/navigation";
import LoginForm from "./components/login-form.component";
import Footer from "./components/footer.component";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = window?.sessionStorage.getItem("token");
    if (token) return router.push("/dashboard/compras");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <h1 className="text-3xl font-bold text-center p-12">
          App de Requisições
        </h1>
      </header>
      <div className="flex justify-center mt-32">
        <div className="w-1/4 flex justify-center">
          <UserPcImage style={{ maxWidth: "250px" }} />
        </div>
        <div className="w-1/4">
          <LoginForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
