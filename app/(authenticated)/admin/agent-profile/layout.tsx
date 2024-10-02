import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Dashboard",
  description: "Profile Dashboard Management",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
