import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password Page",
};

export default function ForgetPasswordLayout({
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
