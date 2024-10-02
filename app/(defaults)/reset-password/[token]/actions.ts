import axios from "axios";

export interface ResetPasswordData {
  new_password: string;
  confirmPassword: string;
  token: string;
}

export const resetPassword = async (token: string, data: ResetPasswordData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/auth/reset-password/${token}`,
    {
      new_password: data.new_password,
      token: data.token,
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data.message || "Error resetting password");
  }

  return response.data.message;
};
