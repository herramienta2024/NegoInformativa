"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ItemMenu from "./ItemMenu";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

import { NegoGarden } from "@/components/NegoGarden";

const MenuPrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [scrollBg, setScrollBg] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isElementVisible = window.scrollY > 40;

      if (isElementVisible) {
        setScrollBg("bg-black/50 backdrop-blur-md ");
      } else {
        setScrollBg("   lg:bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        style={{ filter: "drop-shadow(0px 0px 3px black)" }}
        className={`sticky z-50 top-0 p-2 md:px-10 shadow-sm md:flex md:items-center md:justify-between    ${scrollBg}  `}
      >
        <div className="flex justify-between items-center   ">
          {/* Escudo Logo "inicio" */}
          <Link className="flex" href="/" title="Ir a inicio">
            <Image
              src="/LogoNego.svg"
              width={130}
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
        <div className="flex flex-col  pl-14  ">
          <div
            className={` text-center  flex flex-col h-screen md:h-auto  md:flex md:flex-row  md:items-center md:justify-start  z-[-1] md:z-auto md:static gap-2 absolute text-white bg-black    md:bg-transparent  w-full left-0 top-full md:w-auto md:py-0  md:pl-0 pl-7 md:opacity-100 opacity-0 right-[-400px] transition-all ease-in   ${
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

            <ItemMenu
              ruta="/Marcas"
              setIsOpen={setIsOpen}
              border={pathname == "/Marcas" ? true : false}
            >
              Marcas
            </ItemMenu>

            {/* <div className="hidden lg:block">
              <NegoGarden />
            </div> */}
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-x-4">
          <Link href="/QuienesSomos">
            <Button
              className={`bg-Secundario uppercase text-black hover:bg-white`}
            >
              Quienes somos
            </Button>
          </Link>

          <a href="tel:+573107956853">
            <div className=" uppercase lg:flex text-Secundario ">
              <div>
                <Smartphone className="w-14 h-full" />
              </div>
              <div className="">
                <h1>LLamanos</h1>
                <p className="text-2xl">3107956853</p>
              </div>
            </div>
          </a>
        </div>
      </nav>
    </>
  );
};

export default MenuPrincipal;
