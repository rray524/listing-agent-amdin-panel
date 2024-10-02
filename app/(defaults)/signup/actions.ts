import axios from "axios";

export interface RegisterAgentData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  licenseNumber: string;
  agencyName: string;
  agencyAddress: string;
  yearsOfExperience: number;
  specializations: string;
  profilePicture: File | null;
  governmentID: string;
  linkedInProfile: string;
  website: string;
  marketingPreferences: boolean;
  preferredCommunicationChannels: string;
  languagesSpoken: string;
  serviceAreas: string;
  professionalBio: string;
  certificationsAwards: string;
  references: string;
}

export const registerAgent = async (data: RegisterAgentData): Promise<void> => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof RegisterAgentData];
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/register-agent`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.status !== 201) {
    throw new Error("Registration failed. Please try again.");
  }
};

export const signUpUser = async (data: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/auth/signup/user`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 201) {
    throw new Error("Registration failed. Please try again.");
  }

  return response.data;
};

export const signUpAgent = async (data: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/auth/signup/agent`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 201) {
    throw new Error("Registration failed. Please try again.");
  }

  return response.data;
};
