"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { requestPasswordReset, PasswordResetRequestData } from "./actions";
import InputField from "./components/input-field";
import Title from "@/components/header-title";

const RequestPasswordReset: React.FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<PasswordResetRequestData>();
  const [message, setMessage] = React.useState<string>("");

  const onSubmit = async (data: PasswordResetRequestData) => {
    try {
      const resultMessage = await requestPasswordReset(data);
      setMessage(resultMessage);
    } catch (error: any) {
      if (error.message.includes("Error sending password reset email")) {
        setError("email", {
          type: "manual",
          message: "Error sending password reset email.",
        });
      } else if (error.message.includes("400")) {
        setError("email", {
          type: "manual",
          message: "Email is already registered. Please use a different email.",
        });
      } else {
        setMessage("This Email is not registered.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center py-10 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-custom">
        <Title level="h2">Forget Password Reset</Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            required
            error={errors.email}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default RequestPasswordReset;
