import axios from "axios";

export const createProperty = async (data: FormData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/api/website-properties`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.status !== 201) {
    throw new Error(" Please try again.");
  }

  return response.data;
};

export const updateProperty = async (propertyId: string, data: FormData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/api/website-properties/${propertyId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(" Please try again.");
  }

  return response.data;
};

export const getProperty = async (propertyId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/api/website-properties/${propertyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(" Please try again.");
  }

  return response.data;
};
