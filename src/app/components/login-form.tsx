"use client";

import React, { useState } from "react";
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
    setError,
    formState: { errors, isValid },
  } = useForm<IDashboardLoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: undefined,
  });
  const router = useRouter();
  const { login } = useAuth();

  const isDisabled = !isValid;
  const [showPassword, setShowPasword] = useState(false);

  const handleShowPassword = () => {
    setShowPasword(!showPassword);
  };

  const onSubmit: SubmitHandler<IDashboardLoginForm | any> = async (data) => {
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      setError("password", { message: "email ou senha incorretos" });
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="flex justify-end items-center relative py-1">
            <input
              id="email"
              placeholder="Email"
              type="email"
              {...register("email")}
              className="border border-gray-400 rounded-md p-4 w-full mt-1 p-2 "
            />
            <User className="absolute mr-2 w-10" />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <div className="flex justify-end items-center relative py-1">
            <input
              id="password"
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="border border-gray-400 rounded-md p-4 w-full mt-1 p-2 "
            />
            <KeyRound className="absolute mr-2 w-10" />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <input
            id="mostrarSenha"
            type="checkbox"
            onClick={handleShowPassword}
            className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded my-1"
          />{" "}
          Mostrar senha
        </div>

        <button
          type="submit"
          disabled={isDisabled ? true : false}
          className={
            isDisabled
              ? "bg-gray-200 text-white p-2 rounded-md w-full"
              : "bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
          }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
