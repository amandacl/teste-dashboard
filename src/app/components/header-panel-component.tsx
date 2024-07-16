"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import LogoutModal from "./logout-modal.component";
import { useUser } from "../hooks/user.hook";
interface headerProps {
  title: string;
}

export default function HeaderPanel({ title }: headerProps) {
  const { logout } = useAuth();
  const { username } = useUser();
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
      <div className="flex justify-between items-center bg-blue-800 text-white p-4">
        <h2>{title}</h2>

        <button
          onClick={() => onOpenLogoutModal(true)}
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {onlyInitialNameLetters(username)}
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
