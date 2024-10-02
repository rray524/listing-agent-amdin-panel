"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-provider";
import { ToastProvider } from "@/contexts/toast-context";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className={`bg-white w-full roboto.className`}>
        <ToastProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
