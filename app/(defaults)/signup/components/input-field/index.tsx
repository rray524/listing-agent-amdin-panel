import React from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError | undefined;
  validate?: (value: any) => boolean | string;
  hidden?: boolean;
  validation?: RegisterOptions;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  required = false,
  validate,
  error,
  hidden = false,
  validation = {},
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "").slice(0, 10);
    event.target.value = value;
    register(name).onChange({
      target: {
        name: name,
        value: value,
      },
    });
  };
  if (hidden) return null;

  return (
    <div className={`flex flex-col ${hidden ? "hidden" : ""} mb-4`}>
      <label className="font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name, {
          ...validation,
          required: required ? `${label} is required` : false,
          validate: validate || undefined,
        })}
        onChange={type === "number" ? handleChange : undefined}
        className={`mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && error.message === "Request failed with status code 400" ? (
        <span className="text-red-500">Email is already registered</span>
      ) : (
        error && <span className="text-red-500">{error.message}</span>
      )}
    </div>
  );
};

export default InputField;
