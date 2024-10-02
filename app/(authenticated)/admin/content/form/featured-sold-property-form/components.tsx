import { useFormContext } from "react-hook-form";
import { SelectProps } from "./types";
import { useState } from "react";

export const TabButton = ({
  hasError,
  label,
  isActive,
  onClick,
}: {
  isActive: boolean;

  hasError: boolean;
  label: string | JSX.Element;
  onClick: () => void;
}) => {
  return (
    <button
      className={`${
        isActive
          ? "border-b-2 border-indigo-600 text-indigo-600"
          : hasError
          ? "text-red-500"
          : ""
      } pb-2`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const Input = ({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  disabled = false,
  prefix,
}: {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: any) => void;
  error: any;
  type?: string;
  disabled?: boolean;
  prefix?: string;
}) => {
  return (
    <div>
      <label className="block font-semibold dark:text-gray-900">{label}</label>
      <div className="flex items-center">
        {prefix && (
          <span className="flex items-center px-3 bg-gray-200 text-gray-700 border border-gray-300 border-r-0 rounded-l-md h-[3.1rem]">
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={`p-3 border border-gray-300 ${
            prefix ? "rounded-l-none rounded-b-none" : "rounded"
          } rounded w-full`}
        />
      </div>
      {error?.length && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export const Input2 = ({
  name,
  label,
  error,
  type = "text",
}: {
  name: string;
  label: string;
  error: any;
  type?: string;
}) => {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div>
      <label className="block font-semibold dark:text-gray-900">{label}</label>
      <input
        {...register(name, {
          required: `${label} is required`,
        })}
        type={type}
        name={name}
        className="p-3 border border-gray-300 rounded w-full"
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export const Select = ({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  error: any;
  type?: string;
}) => {
  return (
    <div>
      <label className="block font-semibold dark:text-gray-900">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="p-3 border border-gray-300 rounded w-full"
      >
        <option value="">Select one</option>
        <option value="sale">Sale</option>
        <option value="lease">Lease</option>
      </select>
      {error?.length && <p className="text-red-500">{error}</p>}
    </div>
  );
};

const FormSelect: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  options,
  className = "p-3 border border-gray-300 rounded w-full ",
  placeholder = "Select",
}) => {
  return (
    <select name={name} value={value} onChange={onChange} className={className}>
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
