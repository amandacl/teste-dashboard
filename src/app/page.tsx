/* eslint-disable @next/next/no-img-element */
import "./styles/globals.css";
import LoginForm from "./components/login-form";

export default function Home() {
  return (
    <div className="flex items-center flex-col bg-gray-100 min-h-screen" >
      <h1 className="text-2xl font-bold text-gray-900">App de Requisições</h1>
      <div className="max-w-4xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 flex space-x-8 items-center justify-center">
        <img
          src={"@public/images/hero-illustration.svg"}
          alt="Formulário"
          className="h-12 w-auto"
        />
        <LoginForm />
      </div>
    </div>
  );
}
