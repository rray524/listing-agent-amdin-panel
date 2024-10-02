import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password Page",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
