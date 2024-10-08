"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ModalUbicacion = dynamic(() => import("../components/ModalUbicacion"), {
  ssr: false,
});
const Footer = () => {
  const [OpenModalSearch, setOpenModalSearch] = useState(false);

  return (
    <>
      {OpenModalSearch && (
        <ModalUbicacion
          setOpenModalSearch={setOpenModalSearch}
          OpenModalSearch={OpenModalSearch}
        />
      )}
      <footer className="border-t   py-6 px-4 lg:px-0 bg-Tertiary text-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 items-center sm:items-start">
          <div className="flex justify-between items-center   ">
            {/* Escudo Logo "inicio" */}
            <Link className=" w-full h-full " href="/" title="Ir a inicio">
              <Image
                src="/LogoNego.svg"
                width={300}
                height={100}
                alt="Logotype"
                style={{
                  objectFit: "contain",
                }}
                className="mx-auto"
              />
            </Link>
          </div>

          <div className=" lg:mx-auto  ">
            <h1 className="font-semibold mb-2 text-xl text-Secundario">
              Páginas de interés{" "}
            </h1>
            <hr className="mb-2" />
            <div className="space-y-2">
              <div className="flex space-x-2 items-center ">
                <ul>
                  <li className="hover:text-Secundario">
                    <Link href={"/PreguntasFrecuentes"}>
                      Preguntas frecuentes
                    </Link>
                  </li>
                  <li
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModalSearch(true);
                    }}
                    className="hover:text-Secundario hover:cursor-pointer"
                  >
                    <p>Dónde comprar</p>
                  </li>

                  <li className="hover:text-Secundario">
                    <Link href={"/Garantia"}>Garantía de productos</Link>
                  </li>
                  <li className="hover:text-Secundario"></li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" lg:mx-auto  ">
            <h1 className="font-semibold mb-2 text-xl uppercase text-Secundario">
              Sobre nosotros
            </h1>
            <hr className="mb-2" />
            <div className="space-y-2">
              <div className="flex space-x-2 items-center ">
                <ul>
                  <li className="hover:text-Secundario">
                    <Link href={"/Contacto"}>Trabaja con nosotros</Link>
                  </li>
                  <li className="hover:text-Secundario">
                    <Link href={"/Contacto"}>Contacto</Link>
                  </li>
                  <li className="hover:text-Secundario">
                    <Link href={"/Contacto"}>
                      ¿Quieres colaborar con nosotros?
                    </Link>
                  </li>
                  <li className="hover:text-Secundario">
                    <Link href={"/AvisoLegal"}>Aviso Legal</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className=" lg:mx-auto  ">
            <h1 className="font-semibold mb-2 text-xl uppercase">
              POLÍTICAS Y TÉRMINOS
            </h1>
            <hr className="mb-2" />
            <div className="space-y-2">
              <div className="flex space-x-2 items-center ">
                <ul>
                  <li className="hover:text-Secundario">
                    <Link href={"/Delivery"}>Términos y Condiciones</Link>
                  </li>
                  <li className="hover:text-Secundario">
                    <Link href={"/PoliticasPrivacidad"}>
                      Políticas de privacidad
                    </Link>
                  </li>
                  <li className="hover:text-Secundario">
                    <Link href={"/TerminosCondiciones"}>
                      Términos y Condiciones
                    </Link>
                  </li>
                  <li className="hover:text-Secundario">
                    <Link href={"/PromocionesComerciales"}>
                      Promociones Comerciales
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}

          <div className="  sm:col-span-2 lg:col-span-4 ">
            <div className="">
              <hr className=" py-2 border-gray-300" />
              <div className="flex  flex-wrap items-center md:justify-between justify-center">
                <div className="w-full  px-4 mx-auto text-center">
                  <div className="text-sm font-semibold text-Secundario ">
                    Copyright ©{" "}
                    <span id="get-current-year">
                      {new Date().getFullYear()}
                    </span>{" "}
                    La herramienta{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
