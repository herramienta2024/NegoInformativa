"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { MonitorSpeakerIcon } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  const BannerInicio = [
    {
      imagen: "/Banners/Banner.webp",
    },
  ];

  return (
    <div className="lg:-mt-[112px]">
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {BannerInicio?.map((banner, index) => (
          <div
            key={index}
            className="relative w-full   h-[21rem]  sm:h-screen "
          >
            <img
              src={banner.imagen}
              className="h-full w-full object-cover overflow-hidden  "
              alt={`slider ${index}`}
            />

            <div className=" absolute top-0 left-0 bg-black/60 w-full h-full text-white">
              <div className=" flex  justify-start items-center max-w-[883px] h-full pl-2 sm:text-3xl  sm:pl-20">
                <div className="max-w-[40rem] space-y-1 sm:space-y-4 ">
                  <section className="sm:p-2 font-bold bg-[#33bd6c] border border-[#33bd6c] text-xl uppercase rounded-3xl rounded-br-none rounded-tl-none  outline-none shadow-lg hover:shadow-xl hover:opacity-90 duration-200 w-[10.5rem]">
                    LANZAMIENTO
                  </section>
                  <p className="text-start text-base sm:text-4xl font-extrabold ">
                    Tu depa soñado{" "}
                    <span className="text-[#33bd6c] ">
                      {" "}
                      rodeado de parques.
                    </span>
                  </p>

                  <p className="flex text-base flex-wrap">
                    <span>
                      <MonitorSpeakerIcon className="text-[#33bd6c] w-4 h-4 sm:w-7 sm:h-7" />
                    </span>
                    <span className="text-base sm:text-lg px-2 ">
                      {" "}
                      Urb. El RECREO, calle Paraguay Mz K Lt 21
                    </span>
                  </p>
                  <Link
                    href={"/ProyectosVenta/MariaAuxiliadora"}
                    className="flex justify-start"
                  >
                    <div className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-start cursor-pointer sm:h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-transparent text-white border-[#33bd6c] hover:text-white hover:bg-[#33bd6c] ">
                      <strong className="font-bold uppercase">
                        {" "}
                        Ver PROYECTO{" "}
                      </strong>

                      <span className="absolute bg-[#33bd6c] bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="w-full h-80"></div>
    </div>
  );
};

export default HomePage;
