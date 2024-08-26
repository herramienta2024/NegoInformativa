"use client";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProyectosCarrousel = () => {
  const Proyects = [
    {
      Tipo: "Para la agricultura",
      Nombre: "NEGO",
      Image:
        "https://www.bellota.com/es-co/wp-content/uploads/sites/5/2024/01/DSC0239_1.jpg",
      Direction: "En Magdalena del Mar",
      Link: "/Marcas",
    },
    {
      Tipo: "Para la construcción",
      Nombre: "NEGO",
      Image:
        "https://www.bellota.com/es-co/wp-content/uploads/sites/5/2024/01/DSC0189-1-scaled.jpg",
      Link: "/Marcas",
    },
    {
      Tipo: "BePower",
      Nombre: "NEGO",
      Image:
        "https://www.bellota.com/es-co/wp-content/uploads/sites/5/2024/01/DSC0031-002-scaled.jpg",
      Link: "/Marcas",
    },
  ];
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
      >
        {Proyects?.map((proyect) => (
          <div key={proyect.Nombre} className="  w-full h-[520px]   ">
            <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
              <img
                src={proyect.Image}
                className="max-h-[350px] w-full aspect-square object-cover overflow-hidden object-center"
                alt="slider 1"
              />
            </div>
            <div className="bg-black text-white h-[170px] pt-6 w-full space-y-1 text-center">
              <div className="space-y-2">
                <h1 className=" text-2xl font-semibold uppercase ">
                  {proyect.Tipo}
                </h1>
                <h2 className=" uppercase  ">{proyect.Nombre}</h2>
              </div>
              {proyect.External ? (
                <a
                  href={proyect.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="inline-block mr-2 mt-2">
                    <button
                      type="button"
                      className="focus:outline-none text-white text-lg p-2 rounded-md border-2 border-white hover:bg-black"
                    >
                      Más Información{" "}
                    </button>
                  </div>
                </a>
              ) : (
                <Link href={proyect.Link}>
                  <div className="inline-block  ">
                    <button
                      type="button"
                      className="focus:outline-none text-white text-lg p-2 rounded-md border-2 border-white hover:bg-black"
                    >
                      Más Información{" "}
                    </button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProyectosCarrousel;
