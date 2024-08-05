"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ItemMenu from "./ItemMenu";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const MenuPrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollBg, setScrollBg] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isElementVisible = window.scrollY > 40;
      setScrollBg(
        isElementVisible ? "bg-[#075fa5]" : "bg-[#075fa5] lg:bg-transparent"
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div>
      <nav
        style={{ filter: "drop-shadow(0px 0px 3px black)" }}
        className={`sticky z-50 top-0 p-2 md:px-10 shadow-sm md:flex md:items-center md:justify-between ${scrollBg} `}
      >
        <div className="  flex justify-between items-center  ">
          {/* Escudo Logo "inicio" */}
          <Link href="/">
            <div
              // style={{ filter: "drop-shadow(0px 0px 6px #99C5B5)" }}
              className="cursor-pointer"
            >
              <Image
                title="Ir a inicio"
                src="/Logo.webp"
                width={100}
                height={50}
                alt="Logotype"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
          <span className="text-3xl cursor-pointer mx-2 md:hidden block text-white">
            <button name="Menu" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-10 w-10 text-[#7d2d04]"
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
        <div className="flex flex-col   ">
          <div
            className={` text-center  flex flex-col h-screen md:h-auto  md:flex md:flex-row  md:items-center  z-[-1] md:z-auto md:static gap-2 absolute text-white bg-[#ece4d9]    md:bg-transparent  w-full left-0 top-full md:w-auto md:py-0  md:pl-0 pl-7 md:opacity-100 opacity-0 right-[-400px] transition-all ease-in  ${
              isOpen ? ` right-0 py-11 opacity-100` : `hidden`
            }`}
          >
            {/*  */}
            <ItemMenu
              ruta="/"
              setIsOpen={setIsOpen}
              border={pathname == "/" ? true : false}
            >
              Inicio
            </ItemMenu>
            {/* <ItemMenu
              ruta="/Carta"
              setIsOpen={setIsOpen}
              border={pathname == "/Carta" ? true : false}
            >
              Nuestra Carta
            </ItemMenu>
            <ItemMenu
              ruta="/Promociones"
              setIsOpen={setIsOpen}
              border={pathname == "/Promociones" ? true : false}
            >
              Promociones
            </ItemMenu>
            <ItemMenu
              ruta="/Reservas"
              setIsOpen={setIsOpen}
              border={pathname == "/Reservas" ? true : false}
            >
              Reservas
            </ItemMenu> */}
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-x-4">
          <Link href="/Delivery">
            <Button className="bg-red-700 uppercase">mmmm</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MenuPrincipal;
