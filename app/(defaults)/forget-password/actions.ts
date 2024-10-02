import axios from "axios";

export interface PasswordResetRequestData {
  email: string;
}

export const requestPasswordReset = async (data: PasswordResetRequestData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/auth/forgot-password`,
    data
  );

  if (response.status !== 200) {
    throw new Error(
      response.data.message || "Error sending password reset email"
    );
  }

  return response.data.message;
};
