import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWrapper from "./utils/wrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checkout SDK - Wallet Balance with NextJS",
  description: "Examples of how to check wallet balance using the Checkout SDK with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          {children}
        </AppWrapper>
        </body>
    </html>
  );
}