import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Page",
};

export default function SignupLayout({
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
