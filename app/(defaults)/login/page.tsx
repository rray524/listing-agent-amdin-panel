"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import InputField from "./components/input-field";
import { loginAgent } from "./actions";
import Link from "next/link";
import SubmitButton from "./components/button/button";
import ToggleVisibilityButton from "./components/button/button-visible";
import Title from "@/components/header-title";
import { ToastContainer } from "react-toastify";
import { useToast } from "@/contexts/toast-context";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginAgent: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const loginData = { ...data, user_type: "agent" };
      const result = await loginAgent(loginData);
      login(result.token, result.agentId);
      showToast("loggedin successfully!", "success");
      router.push("/admin");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Your email/password is not right, please try again with valid access!";
      if (err.response?.data?.field) {
        setError(err.response.data.field, {
          type: "server",
          message: errorMessage,
        });
      } else {
        setError("password", {
          type: "server",
          message: errorMessage,
        });
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto py-12 px-3">
      <div className="bg-white p-6 rounded-lg shadow-custom">
        <Title level="h2">Agent Login</Title>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            required
            error={errors.email}
          />
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`mt-1 p-2 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <ToggleVisibilityButton
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <SubmitButton label="Login" />
        </form>
      </div>
      <p className="text-center dark:text-gray-400 my-10">
        Forgot Password?{" "}
        <Link href={"/forget-password"} className="text-indigo-600">
          Request a new password reset link
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default LoginAgent;
