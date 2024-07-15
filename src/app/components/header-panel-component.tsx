"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { AlignJustify } from "lucide-react";
import LogoutModal from "./logout-modal.component";
interface headerProps {
  name: string;
  title: string;
}

export default function HeaderPanel({ name, title }: headerProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const [isOpenLogoutModal, onOpenLogoutModal] = useState(false);

  const onlyInitialNameLetters = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between items-center bg-blue-600 text-white p-4">
        <div className="flex items-center gap-8">
          <button className="bg-white py-2 px-4 text-black rounded-full focus:outline-none">
            {<AlignJustify />}
          </button>
          <h2>{title}</h2>
        </div>
        <button
          onClick={() => onOpenLogoutModal(true)}
          className="bg-blue-900 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {onlyInitialNameLetters(name)}
        </button>
      </div>
      <LogoutModal
        isOpen={isOpenLogoutModal}
        onClose={() => onOpenLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
