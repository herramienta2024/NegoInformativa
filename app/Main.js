"use client";
import MenuPrincipal from "./MenuPrincipal";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const Main = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/Admin") ? (
        <>{children}</>
      ) : (
        <main>
          <MenuPrincipal />
          {children}
          <Footer />
        </main>
      )}
    </>
  );
};

export default Main;
