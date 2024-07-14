"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login-schema";
import { useRouter } from "next/navigation";
import { User, KeyRound } from "lucide-react";
import { useAuth } from "../context/auth-context";

export interface IDashboardLoginForm {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDashboardLoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: undefined,
  });
  //const router = useRouter();
  const { login } = useAuth();
  const onSubmit: SubmitHandler<IDashboardLoginForm | any> = async (data) => {
    console.log(data);
    const response = await login(data.email, data.password);
    console.log(response);
    // if (response?.error) {
    //   errorModal.onOpen()
    // }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="flex justify-end items-center relative">
            <input
              id="email"
              placeholder="Email"
              type="email"
              {...register("email")}
              className="border border-gray-400 rounded-md p-4 w-full mt-1 p-2 "
            />
            <User className="absolute mr-2 w-10" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex justify-end items-center relative">
            <input
              id="password"
              placeholder="Senha"
              type="password"
              {...register("password")}
              className="border border-gray-400 rounded-md p-4 w-full mt-1 p-2 "
            />
            <KeyRound className="absolute mr-2 w-10" />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          login
        </button>
        {/* <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.onClose}
        title="CANNOT LOGIN"
        disclaimer="Wrong email or password"
      /> */}
      </form>
    </div>
  );
}
