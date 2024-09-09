import React from "react";
import TitleSection from "../TitleSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const PreguntasFrecuentes = () => {
  // Preguntas frecuentes de la página
  const Preguntas = [
    {
      pregunta: "¿Dónde se encuentra la sede de NEGO?",
      respuesta: `Las oficinas centrales de Nego se encuentran en Ibagué - Tolima Si necesitas contactar directamente con nosotros, consulta nuestra página de contacto.`,
    },
    {
      pregunta: "¿Qué garantía tienen los productos de NEGO?",
      respuesta:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos et repellendus, quidem dicta, recusandae molestias dolores at sint praesentium reprehenderit minus neque minima? A molestiae pariatur esse ut architecto accusantium.",
    },
    {
      pregunta: "¿Dónde puedo consultar los precios de herramientas NEGO?",
      respuesta:
        "Esta web es informativa y no tiene habilitada la venta online. Si deseas conocer los precios de nuestros productos, te recomendamos que visites la sección de (productos - Donde Comprar)  de nuestra web y te pongas en contacto con tu distribuidor más cercano.",
    },
    {
      pregunta: "¿Es posible comprar los productos a través de la web de NEGO?",
      respuesta: `Actualmente no puedes comprar las herramientas de NEGO a través de nuestra web, pero puedes hacerlo en las tiendas online de nuestros distribuidores.`,
    },
    {
      pregunta:
        "¿Cumple NEGO las normativas vigentes de fabricación y calidad de la herramienta?",
      respuesta:
        " Sí, todos nuestros productos cumplen con las normativas vigentes.",
    },
  ];
  return (
    <div className="-mt-[84px] md:-mt-[96px] lg:-mt-[91.09px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`Preguntas Frecuentes`}
        image="/Banners/BannerPreguntasFrecuentes.webp"
      />

      <Card className=" w-full h-full  mx-auto   max-w-7xl  py-4 my-8">
        <CardContent>
          <Accordion type="single" collapsible className="">
            {Preguntas.map((pregunta, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{pregunta.pregunta}</AccordionTrigger>
                <AccordionContent>{pregunta.respuesta}</AccordionContent>
              </AccordionItem>
            ))}
            {/* <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos et
                repellendus, quidem dicta, recusandae molestias dolores at sint
                praesentium reprehenderit minus neque minima? A molestiae
                pariatur esse ut architecto accusantium.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. Its animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreguntasFrecuentes;
