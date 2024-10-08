import { Inter } from "next/font/google";
import "./globals.css";
import Main from "./Main";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEGO",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, modal }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {modal}
        <Main>{children}</Main>
        <Toaster />
      </body>
    </html>
  );
}
