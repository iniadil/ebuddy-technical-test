import { ReactNode } from "react";
import ProviderLayout from "./ProviderLayout";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eBuddy Technical Test",
  description: "this is a technical test for my eBuddy task",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
