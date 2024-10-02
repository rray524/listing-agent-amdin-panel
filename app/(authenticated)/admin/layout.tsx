import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Property Dashboard",
  description: "The official Next.js Course Dashboard, built with App Router.",
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative">
        <MainContainer>
          <div className="main-content flex flex-col dark:bg-primary">
            <Header />
            {children}
            <Footer />
          </div>
        </MainContainer>
      </div>
    </>
  );
}
