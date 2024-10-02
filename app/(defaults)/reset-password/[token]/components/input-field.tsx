import React from "react";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError | undefined;
  validate?: RegisterOptions["validate"];
  hidden?: boolean;
  validation?: RegisterOptions;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  required = false,
  error,
  validate,
  hidden = false,
  validation = {},
}) => {
  return (
    <div className={`flex flex-col ${hidden ? "hidden" : ""}`}>
      <label htmlFor={name} className="font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
          validate: validate,
          ...validation,
        })}
        className={`mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputField;
