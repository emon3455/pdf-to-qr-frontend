import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/components/navbar";
import CustomFooter from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF To QR",
  description:
    "This is an website which is used for generating qr code from an pdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <header>
          <CustomNavbar />
        </header>

        <main className="-mt-12">{children}</main>

        <CustomFooter />
      </body>
    </html>
  );
}
