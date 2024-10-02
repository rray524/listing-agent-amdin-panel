import { useState } from "react";

export const useForm = <T>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    if (type === "file" && e.target instanceof HTMLInputElement) {
      newValue = e.target.files ? e.target.files[0] : null;
    } else if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, resetForm, setValues };
};
