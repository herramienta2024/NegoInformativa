"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

const HomePage = () => {
  const [Marcas, setMarcas] = useState([]);

  console.log(Marcas);

  const BannerInicio = [
    {
      imagen: "/Banners/Banner.jpg",
    },
  ];

  // Variantes de animación para fade-in
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const marcasRef = collection(db, "Marcas");
        const q = query(marcasRef, where("Estado", "==", "Activo"));
        const querySnapshot = await getDocs(q);

        const marcasData = querySnapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMarcas(marcasData);
      } catch (error) {
        console.error("Error fetching marcas: ", error);
      }
    };

    fetchMarcas();
  }, []);
  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50">
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {BannerInicio?.map((banner, index) => (
          <div key={index} className="relative w-full h-[21rem] sm:h-screen">
            <img
              src={banner.imagen}
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
                  >
                    Soluciones
                  </motion.section>
                  <motion.p
                    className="text-start text-base sm:text-4xl font-extrabold"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    A tu{" "}
                    <span className="text-Secundario uppercase"> Medida </span>
                  </motion.p>

                  <Link href={"/QuienesSomos"} className="flex justify-start">
                    <motion.div
                      className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-start cursor-pointer sm:h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-transparent text-white border-Secundario hover:text-black hover:bg-Secundario"
                      initial="hidden"
                      animate="visible"
                      variants={fadeInVariants}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <strong className="font-bold uppercase">
                        Quienes Somos
                      </strong>
                      <span className="absolute bg-Secundario bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Carousel>

      <div className="container mx-auto">
        <div className=" w-full h-full mx-auto space-y-6 shadow-xl bg-white rounded-lg">
          <div className="grid w-full grid-cols-1 my-auto mt-8 mb-8 md:grid-cols-2 xl:gap-8 gap-5">
            <div className="flex flex-col justify-center col-span-1 text-center lg:text-start px-8">
              <div className="flex items-center justify-center mb-4 lg:justify-normal">
                <Image src={"/Tuerca.svg"} width={30} height={30} alt="logo" />
                <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">
                  DESCUBRE LO NUEVO
                </h4>
              </div>
              <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900">
                NUESTROS PRODUCTOS
              </h1>
              <p className="mb-6 text-base font-normal leading-7 l  text-grey-700">
                Nuestra empresa se enorgullece de ofrecer herramientas de alta
                calidad para satisfacer todas tus necesidades.
              </p>
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                <div className="inline-block mr-2 mt-2">
                  <Link href={"/QuienesSomos"} className="flex justify-start">
                    <motion.div
                      className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-start cursor-pointer sm:h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-transparent border-Secundario hover:text-black hover:bg-Secundario"
                      initial="hidden"
                      animate="visible"
                      variants={fadeInVariants}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <strong className="font-bold uppercase">
                        Más detalles{" "}
                      </strong>
                      <span className="absolute bg-Secundario bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="">
              <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-4 p-6  md:grid-cols-3  ">
                {Marcas?.map((Marca) => (
                  <div
                    key={Marca.id}
                    className={`w-full  border-gray-200 mx-auto border    rounded-lg  shadow-md`}
                  >
                    {Marca?.Imagenes?.length > 0 && (
                      <section
                        className={"rounded-lg relative w-full h-[200px] px-4"}
                        style={{
                          backgroundColor: Marca?.ColorMarca || "black",
                        }}
                      >
                        <Image
                          className="rounded-t-lg "
                          fill
                          src={Marca?.Imagenes[0] || ""}
                          alt="imageMarca"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </section>
                    )}
                  </div>
                ))}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={fadeInVariants}
        className=" mx-auto space-y-4 shadow-xl bg-white"
      >
        <div className=" bg-black items-center justify-center flex flex-col">
          <div className="items-center justify-center w-full p-8 flex flex-col">
            <div className="rounded-xl max-w-2xl mx-auto bg-gray-800/50 px-6 py-4 shadow-lg backdrop-blur-md  flex justify-center items-center flex-col">
              <h4 className="w-48 border-t-4 border-solid border-[#ffcc29] h-4"></h4>
              <h4
                className="text-orange-300    text-2xl"
                style={{ fontFamily: "Abel" }}
              >
                ¿Quiénes somos?
              </h4>
              <h2
                className="text-gray-300   text-5xl text-center mt-2 mb-3"
                style={{ fontFamily: '"Archivo Black"' }}
              >
                ¡Descubre nuestra esencia!
              </h2>
              <div className="inline-block mr-2 mt-2">
                <Link
                  href={"/QuienesSomos"}
                  className="focus:outline-none text-black text-lg py-2.5 px-5 rounded-md bg-[#ffcc29]/80 hover:scale-105 hover:shadow-lg flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                  Conócenos{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
