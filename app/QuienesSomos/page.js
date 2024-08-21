"use client";

import { Card, CardContent } from "@/components/ui/card";
import TitleSection from "../TitleSection";
import Image from "next/image";
import { motion } from "framer-motion";

const QuienesSomos = () => {
  const Data = [
    {
      id: 1,
      title: "MISIÓN",
      icon: "/Nosotros/Mision.png",
      description:
        "Proveer herramientas de alta calidad para los profesionales y aficionados en Colombia, impulsadas por un equipo de expertos dedicados. Nos comprometemos a no solo satisfacer las necesidades de nuestros clientes, sino también a liderar la innovación en el mercado de herramientas, siempre con un enfoque en la sostenibilidad y el respeto por el medio ambiente.",
    },
    {
      id: 2,
      title: "VISIÓN",
      icon: "/Nosotros/Vision.png",
      description:
        "Aspiramos a ser reconocidos como la marca de herramientas más confiable y preferida en Colombia. Nuestro objetivo es liderar el sector con integridad, impulsando el desarrollo de industrias, talleres y proyectos en todo el país.",
    },
    {
      id: 3,
      title: "OBJETIVO",
      icon: "/Nosotros/Objetivos.png",
      description:
        "Crear herramientas que permitan a nuestros clientes lograr resultados excepcionales en sus proyectos, destacándose por su calidad, durabilidad y diseño innovador, alineados con las necesidades del mercado colombiano.",
    },
    {
      id: 4,
      title: "VALORES",
      icon: "/Nosotros/Valores.png",
      description:
        "Nuestros valores fundamentales incluyen un firme compromiso con la calidad, la innovación constante en nuestras herramientas, un enfoque colaborativo en equipo, y una adaptabilidad que nos permite satisfacer las demandas del mercado colombiano y enfrentar cualquier desafío.",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`Soluciones a tu medida`}
        image="/Banners/BannerNosotros.webp"
      />

      <div className="py-7 w-full h-full container shadow-md bg-white space-y-5">
        <Card className="border-black border-2">
          <CardContent className="grid w-full grid-cols-1 my-auto mt-6 mb-8 lg:grid-cols-2 gap-6">
            <motion.div
              className="flex flex-col justify-center items-center text-base font-normal leading-7 w-full px-2 lg:px-4 text-gray-700 text-justify space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={sectionVariants}
            >
              <h1 className="text-xl font-extrabold leading-tight lg:text-2xl text-gray-900 uppercase">
                Nego Tools
              </h1>
              <p>
                En Nego Tools S.A.S, somos una marca colombiana dedicada a
                fabricar y distribuir herramientas de alta calidad para
                profesionales y aficionados en todo el país. Con varios años en
                el mercado, nos destacamos por nuestra innovación, durabilidad y
                confianza.
              </p>
              <p>
                Más que ofrecer productos, queremos ser el aliado esencial en
                cada proyecto de nuestros clientes. Nuestras herramientas están
                diseñadas para rendir al máximo en cualquier circunstancia.
              </p>
              <p>
                Valoramos el trabajo bien hecho y la importancia de tener las
                herramientas adecuadas. Por eso, cada línea de nuestros
                productos se enfoca en la calidad, seguridad y sostenibilidad,
                adaptándonos siempre a las necesidades del mercado colombiano.
              </p>
            </motion.div>
            <motion.div
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={sectionVariants}
            >
              <Image
                className="w-full rounded-md"
                src="/Banners/BannerNosotrosBody.webp"
                alt="header image"
                layout="responsive" // Usa la opción de diseño adecuado
                width={1200} // Establece el ancho según sea necesario
                height={600} // Establece la altura según sea necesario
              />
            </motion.div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
          {Data.map((item, index) => {
            return (
              <motion.div
                key={index}
                className="p-8 space-y-3 border-2 border-black rounded-xl shadow-lg bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 50 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
              >
                <div className="flex justify-start gap-x-2 items-center">
                  <div className="inline-block text-blue-500">
                    <Image
                      src={item.icon}
                      width={48}
                      height={48}
                      alt={item.title}
                    />
                  </div>
                  <h1 className="text-2xl font-semibold text-gray-800 capitalize">
                    {item.title}
                  </h1>
                </div>
                <p className="text-gray-700 text-justify">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
