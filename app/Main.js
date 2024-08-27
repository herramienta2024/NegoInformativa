"use client";
import MenuPrincipal from "./MenuPrincipal";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import MenuMarcas from "./MenuMarcas";

const Main = ({ children, marcas }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/Admin") ? (
        <>{children}</>
      ) : (
        <main>
          {pathname.includes("/Marcas") ? (
            <></>
          ) : (
            <>
              <MenuPrincipal />
            </>
          )}

          {children}
          <Footer />
        </main>
      )}
    </>
  );
};

export default Main;
