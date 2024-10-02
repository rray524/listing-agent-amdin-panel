"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUpAgent, signUpUser } from "./actions";
import InputField from "./components/input-field";
import Title from "@/components/header-title";
import { useToast } from "@/contexts/toast-context";
import EyeIcon from "./components/icons/eye-icon";
import EyeCloseIcon from "./components/icons/eye-close-icon";

const AgentSignup: React.FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const onSubmit = async (data: any) => {
    try {
      let data = getValues();

      const response = await signUpUser({
        password: data.password,
        email: data.email,
        user_type: "agent",
      });

      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        mobile: data.mobile,
        email: data.email,
        user_id: response.user._id,
        public_id: response.user._id,
      };

      const result = await signUpAgent(payload);

      if (result.status) {
        alert("You have successfully signed up");
        showToast("Registered successfully!", "success");
        router.push("/admin/login");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        for (const [field, message] of Object.entries(serverErrors)) {
          setError(field as any, {
            type: "server",
            message: message as string,
          });
        }
      } else if (
        error.response?.data?.message &&
        error.response.data.message.includes(
          "Request failed with status code 400"
        )
      ) {
        setError("email", {
          type: "manual",
          message: "Email is already registered. Please use a different email.",
        });
      } else {
        setError("email", {
          type: "manual",
          message: error.message || "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-[50%] max-lg:w-[90%] my-10">
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-custom">
        <Title level="h2">Agent Signup</Title>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="First Name"
            name="first_name"
            register={register}
            required
            error={errors.first_name}
          />

          <InputField
            label="Last Name"
            name="last_name"
            register={register}
            required
            error={errors.last_name}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            required
            error={errors.email}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
          />
          <div className="relative">
            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              register={register}
              required
              error={errors.password}
              validate={(value) => {
                const hasLowerCase = /[a-z]/.test(value);
                const hasUpperCase = /[A-Z]/.test(value);
                const hasDigit = /\d/.test(value);
                const hasSpecialChar = /[@$!%*?&]/.test(value);
                const isValidLength = value.length >= 8;

                if (!hasLowerCase) {
                  return "Password must contain at least one lowercase letter";
                }
                if (!hasUpperCase) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!hasDigit) {
                  return "Password must contain at least one digit";
                }
                if (!hasSpecialChar) {
                  return "Password must contain at least one special character";
                }
                if (!isValidLength) {
                  return "Password must be at least 8 characters long";
                }
                return true;
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 ${
                errors.password ? "top-0" : "top-6"
              } px-3 py-1 text-gray-700`}
            >
              {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
            </button>
          </div>
          <div className="relative">
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              register={register}
              required
              error={errors.confirmPassword}
              validate={(value) =>
                value === getValues("password") || "Passwords do not match"
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute inset-y-0 right-0 ${
                errors.confirmPassword ? "top-0" : "top-6"
              } px-3 py-1 text-gray-700`}
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeCloseIcon />}
            </button>
          </div>
          <InputField
            label="Mobile"
            name="mobile"
            type="number"
            register={register}
            required
            error={errors.mobile}
            validation={{
              required: "Mobile is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Mobile must be exactly 10 digits",
              },
            }}
          />

          <button
            formNoValidate
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentSignup;
