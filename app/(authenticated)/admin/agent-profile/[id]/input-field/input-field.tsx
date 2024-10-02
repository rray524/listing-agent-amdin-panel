import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  value?: any;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
  [key: string]: any;
  disabled?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  disabled,
  ...props
}) => {
  const isMarketingPreferences = name === "marketing_preferences";
  return (
    <div
      className={`flex  ${
        isMarketingPreferences ? "flex-row items-center gap-3" : "flex-col"
      }`}
    >
      <label className="font-semibold">{label}:</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          required={required}
          {...props}
        ></textarea>
      ) : type === "file" ? (
        <input
          type="file"
          name={name}
          onChange={onChange}
          className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          required={required}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
            disabled ? "bg-gray-400" : ""
          }`}
          required={required}
          disabled={disabled}
          {...props}
        />
      )}
    </div>
  );
};

export default InputField;
