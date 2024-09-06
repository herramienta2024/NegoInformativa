"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ItemMenu from "./ItemMenu";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import IconsMenu from "../components/IconsMenu";
import dynamic from "next/dynamic";

const ModalUbicacion = dynamic(() => import("../components/ModalUbicacion"), {
  ssr: false,
});
const MenuPrincipalMarcas = ({ Icono, marcaId, ColorMarca }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [scrollBg, setScrollBg] = useState("");
  const [OpenModalSearch, setOpenModalSearch] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isElementVisible = window.scrollY > 40;

      if (isElementVisible) {
        setScrollBg(`ChangeColor`);
      } else {
        setScrollBg("custom-background");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {OpenModalSearch && (
        <ModalUbicacion
          setOpenModalSearch={setOpenModalSearch}
          OpenModalSearch={OpenModalSearch}
        />
      )}
      <style jsx>{`
        .ChangeColor {
          background-color: ${ColorMarca};
          // opacity: 0.9;
          backdrop-filter: blur(12px);
        }

        @media (min-width: 1024px) {
          /* 'lg' size in Tailwind starts at 1024px */
          .custom-background {
            background-color: transparent;
          }
        }
      `}</style>
      <nav
        style={{ filter: "drop-shadow(0px 0px 3px black)" }}
        className={`sticky z-50 top-0 p-2 py-3 md:px-10 shadow-sm md:flex md:items-center md:justify-between    ${scrollBg}  `}
      >
        <div className="flex justify-between items-center   ">
          {/* Escudo Logo "inicio" */}
          <Link
            className="flex overflow-hidden max-h-[60px] max-w-[150px]"
            href="/"
            title="Ir a inicio"
          >
            <Image
              src={(Icono?.length > 0 && Icono) || "/LogoNego.svg"}
              width={150}
              height={60}
              alt="Logotype"
              className="object-contain"
            />
          </Link>
          <span className="text-3xl cursor-pointer mx-2 md:hidden block text-white">
            <button name="Menu" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>{" "}
            </button>
          </span>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col  pl-14  "
        >
          <div
            className={` text-center  flex flex-col h-screen md:h-auto  md:flex md:flex-row  md:items-center md:justify-start  z-[-1] md:z-auto md:static gap-2 absolute text-white bg-black    md:bg-transparent  w-full left-0 top-full md:w-auto md:py-0  md:pl-0 pl-7 md:opacity-100 opacity-0 right-[-400px] transition-all ease-in   ${
              isOpen ? ` right-0 py-11 opacity-100` : `hidden`
            }`}
          >
            {/*  */}
            <ItemMenu
              ruta={`/Marcas/${marcaId}`}
              setIsOpen={setIsOpen}
              border={pathname == "/Marcas" ? true : false}
            >
              Inicio
            </ItemMenu>

            <ItemMenu
              ruta={`/Marcas/${marcaId}/Productos`}
              setIsOpen={setIsOpen}
              border={pathname == "/Productos" ? true : false}
            >
              Productos
            </ItemMenu>
            <IconsMenu
              OpenModalSearch={OpenModalSearch}
              setOpenModalSearch={setOpenModalSearch}
            />
          </div>
        </motion.div>

        {/* <div className="hidden lg:flex justify-center items-center gap-x-4"></div> */}
      </nav>
    </>
  );
};

export default MenuPrincipalMarcas;
