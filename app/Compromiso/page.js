"use client";
import React from "react";
import TitleSection from "../TitleSection";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Compromiso = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="-mt-[72px] md:-mt-[88px] lg:-mt-[79.09px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`Compromiso`}
        image="/Banners/BannerCompromiso.webp"
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
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={sectionVariants}
            >
              <img
                className="w-full rounded-md"
                src="/Banners/BannerNosotrosBody.webp"
                alt="header image"
              />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compromiso;
