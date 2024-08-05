"use client";
import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  Linkedin,
  PhoneCall,
  PhoneCallIcon,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="border-t   py-6 px-4 lg:px-0 bg-Tertiary text-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 items-center sm:items-start">
          <div className=" lg:mx-auto  ">
            <h1 className="font-semibold mb-2 text-xl">Páginas de interés </h1>
            <hr className="mb-2" />
            <div className="space-y-2">
              <div className="flex space-x-2 items-center ">
                <ul>
                  <li>
                    <Link href={"/Nosotros"}>Preguntas frecuentes</Link>
                  </li>
                  <li>
                    <Link href={"/Nutricion"}>Dónde comprar</Link>
                  </li>
                  <li>
                    <Link href={"/Nutricion"}>
                      Nuestro compromiso con la sociedad
                    </Link>
                  </li>
                  <li>
                    <Link href={"/Nutricion"}>Garantía de productos</Link>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" lg:mx-auto  ">
            <h1 className="font-semibold mb-2 text-xl uppercase">
              Sobre nosotros
            </h1>
            <hr className="mb-2" />
            <div className="space-y-2">
              <div className="flex space-x-2 items-center ">
                <ul>
                  <li>
                    <Link href={"/Delivery"}>Trabaja con nosotros</Link>
                  </li>
                  <li>
                    <Link href={"/Reservas"}>Contacto</Link>
                  </li>
                  <li>
                    <Link href={"/Reservas"}>
                      ¿Quieres colaborar con nosotros?
                    </Link>
                  </li>
                  <li>
                    <Link href={"/Reservas"}>Aviso Legal</Link>
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
                  <li>
                    <Link href={"/Delivery"}>Términos y Condiciones</Link>
                  </li>
                  <li>
                    <Link href={"/PoliticasPrivacidad"}>
                      Políticas de privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href={"/TerminosCondiciones"}>
                      Términos y Condiciones
                    </Link>
                  </li>
                  <li>
                    <Link href={"/PromocionesComerciales"}>
                      Promociones Comerciales
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className=" lg:mx-auto  ">
            <h1 className="font-semibold mb-2 text-xl uppercase">
              CONTÁCTANOS
            </h1>
            <hr className="mb-2" />
            <div className="space-y-2">
              <div className="flex justify-center items-center gap-3">
                <a
                  href="https://www.facebook.com/rodenconstructores"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <FacebookIcon className="text-white hover:text-[#ffd33a] w-8 h-8" />
                </a>

                <a
                  href="https://www.instagram.com/rodenconstructores/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="text-white w-8 h-8 hover:text-[#ffd33a]" />
                </a>
                {/* s */}

                <a
                  href="https://api.whatsapp.com/send?phone=51956223460&text=Hola%20me%20interesa%20los%20dptos.%20de%20El%20Recreo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PhoneCallIcon className="text-white w-8 h-8 hover:text-[#ffd33a]" />
                </a>
              </div>
            </div>
          </div>

          <div className="  sm:col-span-2 lg:col-span-4 ">
            <div className="">
              <hr className=" py-2 border-gray-300" />
              <div className="flex  flex-wrap items-center md:justify-between justify-center">
                <div className="w-full  px-4 mx-auto text-center">
                  <div className="text-sm font-semibold text-white ">
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
