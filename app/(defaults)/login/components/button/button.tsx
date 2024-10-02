import React from "react";

interface SubmitButtonProps {
  label: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, className }) => {
  return (
    <button
      type="submit"
      className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
