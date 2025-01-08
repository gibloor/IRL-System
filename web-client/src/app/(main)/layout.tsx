import type { Metadata } from "next";

import AuthorizationCheck from "./AuthorizationCheck";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <AuthorizationCheck /> */}
      {children}
    </>
  );
}
