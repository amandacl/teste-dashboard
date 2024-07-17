"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import LogoutModal from "./logout-modal.component";
import { useGetUsername } from "../hooks/get-username.hook";
interface headerProps {
  title: string;
}

export default function HeaderPanel({ title }: headerProps) {
  const { logout } = useAuth();
  const { data:username } = useGetUsername();
  const router = useRouter();
  const [isOpenLogoutModal, setisOpenLogoutModal] = useState(false);

  const onlyInitialNameLetters = (name?: string) => {
    if(!name)return
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
          onClick={() => setisOpenLogoutModal(true)}
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {onlyInitialNameLetters(username)}
        </button>
      </div>
      <LogoutModal
        isOpen={isOpenLogoutModal}
        onClose={() => setisOpenLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
