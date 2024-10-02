"use client";

import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";
import { useAuth } from "@/contexts/auth-provider";
import { useRouter } from "next/navigation";
import Preloader from "@/theme/components/preloader/preloader";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, agent, loading } = useAuth();

  if (isAuthenticated) {
    router.push("/admin");
  }

  if (loading) {
    return <Preloader />;
  }

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
