import "./styles/globals.css";
import LoginForm from "./components/login-form.component";
import UserPcImage from "@public/images/hero-illustration.svg";
import Footer from "./components/footer.component";

export default function Home() {
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
