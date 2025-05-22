import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Authentication | eBuddy",
  description: "Sign in or sign up to access your eBuddy account",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
