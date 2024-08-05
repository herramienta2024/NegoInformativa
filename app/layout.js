import { Inter } from "next/font/google";
import "./globals.css";
import Main from "./Main";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "La herramienta",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Main>{children}</Main>

        <Toaster />
      </body>
    </html>
  );
}
