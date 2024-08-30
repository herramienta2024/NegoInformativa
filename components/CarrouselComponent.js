"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import TitleColor from "@/app/TitleColor";
import { motion } from "framer-motion";

function CarrouselComponent({
  Carrousel,
  NombreMarca,
  ColorMarca,
  Slogan,
  idMarca,
}) {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {Carrousel?.length ? (
          Carrousel?.map((banner, index) => (
            <div key={index} className="relative w-full h-[21rem] sm:h-[95vh]">
              <img
                src={banner}
                className="h-full w-full object-cover overflow-hidden"
                alt={`slider ${index}`}
              />

              <motion.div
                className="absolute top-0 left-0 w-full h-full text-white bg-black/40"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.8 }}
              >
                <div className="flex justify-start items-center max-w-[883px] h-full pl-2 sm:text-3xl sm:pl-20">
                  <div className="max-w-[40rem] space-y-1 sm:space-y-4">
                    <motion.section
                      className="sm:p-2 font-bold bg-Secundario border border-Secundario text-xl uppercase rounded-3xl rounded-br-none rounded-tl-none outline-none shadow-lg hover:shadow-xl hover:opacity-90 duration-200 w-[10.5rem] text-black"
                      initial="hidden"
                      animate="visible"
                      variants={fadeInVariants}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      style={{
                        backgroundColor: ColorMarca,
                        borderColor: ColorMarca,
                        color: "white",
                      }}
                    >
                      Slogan
                    </motion.section>
                    <motion.p
                      className="text-start text-base sm:text-4xl font-extrabold "
                      initial="hidden"
                      animate="visible"
                      variants={fadeInVariants}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {Slogan || "Calidad y confianza"}
                    </motion.p>

                    <Link
                      href={`/Marcas/${idMarca}/Productos`}
                      className="flex justify-start"
                    >
                      <style jsx>{`
                        .custom-hover:hover {
                          /* Estilos para hover aquí */
                          background-color: ${ColorMarca}; /* Ejemplo de color en hover */
                          border-color: ${ColorMarca}; /* Ejemplo de borde en hover */
                        }
                      `}</style>
                      <motion.div
                        className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-start cursor-pointer sm:h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-transparent text-white hover:text-black custom-hover"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{
                          backgroundColor: ColorMarca,
                          borderColor: ColorMarca,
                          // hover
                        }}
                      >
                        <strong className="font-bold uppercase">
                          Productos
                        </strong>
                        <span className="absolute bg-white   bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))
        ) : (
          <TitleColor title={NombreMarca} color={ColorMarca} />
        )}
      </Carousel>
    </>
  );
}

export default CarrouselComponent;
