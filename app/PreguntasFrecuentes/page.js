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
  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection
        title={`Preguntas Frecuentes`}
        image="/Banners/BannerPreguntasFrecuentes.webp"
      />

      <Card className=" w-full h-full  mx-auto   max-w-7xl  py-4 my-8">
        <CardContent>
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
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
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreguntasFrecuentes;
