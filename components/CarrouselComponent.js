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
  VideoCarrousel, // Ahora es un array
}) {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Combinar VideoCarrousel y Carrousel en un solo array
  const combinedItems = [
    ...(VideoCarrousel || []).map((video) => ({ type: "video", src: video })),
    ...(Carrousel || []).map((banner) => ({ type: "image", src: banner })),
  ];

  return (
    <>
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {/* Mapea los elementos combinados */}
        {combinedItems?.length > 0 ? (
          combinedItems?.map((item, index) => (
            <div key={index} className="relative w-full h-[95vh] sm:h-[95vh]">
              {item.type === "video" ? (
                // Renderiza el video

                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  style={{ objectFit: "cover" }}
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                // Renderiza la imagen
                <>
                  <img
                    src={item.src?.Imagen || item.src}
                    className="h-full w-full object-cover overflow-hidden"
                    alt={`slider ${index}`}
                  />
                  <motion.div
                    className="absolute top-0 left-0 w-2/4 h-full text-white"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 0.8 }}
                    style={{
                      background: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)`,
                    }}
                  >
                    <div className="flex justify-start items-center max-w-[883px] h-full pl-2 sm:text-3xl sm:pl-20">
                      <div className="max-w-[40rem] space-y-1 sm:space-y-4">
                        <div className="w-full max-w-[20rem]">
                          <motion.h1
                            className="p-2 font-bold bg-Secundario border border-Secundario text-xl uppercase rounded-3xl rounded-br-none rounded-tl-none outline-none shadow-lg hover:shadow-xl hover:opacity-90 duration-200 text-black max-w-full text-center text-wrap"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{
                              backgroundColor: ColorMarca,
                              borderColor: ColorMarca,
                              color: "white",
                              wordWrap: "break-word",
                            }}
                          >
                            {item?.src?.Titulo || "Seguridad y confianza"}
                          </motion.h1>
                        </div>
                        <motion.p
                          className="text-start text-base sm:text-4xl font-extrabold w-auto line-clamp-4 my-4"
                          initial="hidden"
                          animate="visible"
                          variants={fadeInVariants}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          {item.src?.Description || Slogan}
                        </motion.p>

                        <Link
                          href={`/Marcas/${idMarca}/Productos`}
                          className="flex justify-start"
                        >
                          <style jsx>{`
                            .custom-hover:hover {
                              background-color: ${ColorMarca};
                              border-color: ${ColorMarca};
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
                            }}
                          >
                            <strong className="font-bold uppercase">
                              Más información
                            </strong>
                            <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]" />
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          ))
        ) : (
          // Si no hay videos ni imágenes, muestra el nombre de la marca
          <TitleColor title={NombreMarca} color={ColorMarca} />
        )}
      </Carousel>
    </>
  );
}

export default CarrouselComponent;
