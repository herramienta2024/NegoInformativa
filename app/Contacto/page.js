"use client";
import { Input } from "@/components/ui/input";
import TitleSection from "../TitleSection";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

import { motion } from "framer-motion";

const Contacto = () => {
  const [InputValues, setInputValues] = useState({});

  const HandlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="-mt-[84px] md:-mt-[96px] g:-mt-[91.09px] bg-gray-50 w-full h-full">
      <TitleSection title={`Contacto`} image="/Banners/BannerContacto.webp" />
      <div>
        {/* component */}
        <div className="flex justify-center items-center  bg-white">
          {/* COMPONENT CODE */}
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                //Validar si "Celular" existe , sino devolver una alerta
                if (!InputValues.Celular) {
                  return alert("Por favor ingrese un número de celular");
                }
                alert("Esta en desarrollo");
              }}
              className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl"
            >
              <div className="flex">
                <h1 className="font-bold uppercase text-5xl">
                  Enviamos un <br /> mensaje
                </h1>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={sectionVariants}
                className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
              >
                <div className="space-y-2 ">
                  <Label htmlFor="NombreCompleto" className="">
                    Nombre Completo
                  </Label>
                  <Input
                    type="text"
                    id="NombreCompleto"
                    name="NombreCompleto"
                    placeholder="Ingrese su nombre "
                    className="w-full"
                    required
                    onChange={HandlerChange}
                  />
                </div>
                <div className="space-y-2 ">
                  <Label htmlFor="CorreoElectronico" className="">
                    Correo Electronico{" "}
                  </Label>
                  <Input
                    type="email"
                    id="CorreoElectronico"
                    name="CorreoElectronico"
                    onChange={HandlerChange}
                    placeholder="Por favor ingrese su correo"
                    className="w-full"
                    required
                  />
                </div>

                <div className="mt-1 space-y-1.5 w-full ">
                  <Label htmlFor="Celular">Celular</Label>

                  <PhoneInput
                    placeholder="Por favor ingresa tu número de celular"
                    defaultCountry="CO"
                    onChange={(e) => {
                      setInputValues({
                        ...InputValues,
                        Celular: e,
                      });
                    }}
                    name="Celular"
                    id="Celular"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-[#0d1a2e]  focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="space-y-2 ">
                  <Label htmlFor="Asunto" className="">
                    Asunto{" "}
                  </Label>
                  <Input
                    type="text"
                    id="Asunto"
                    name="Asunto"
                    onChange={HandlerChange}
                    placeholder="Motivo de la consulta"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="Descripcion" className="">
                    Descripción del mensaje
                  </Label>
                  <Textarea
                    id="Descripcion"
                    name="Descripcion"
                    className="w-full text-gray-900"
                    onChange={HandlerChange}
                    required
                    autoComplete="off"
                    minLength="10"
                  />
                </div>
              </motion.div>

              {/* Check de estoy de acuerdo con las Terminos y condiciones */}

              <div className="flex items-center space-x-1 py-3 ">
                <input
                  type="checkbox"
                  id="TerminosCondiciones"
                  name="TerminosCondiciones"
                  required
                />
                <Label htmlFor="TerminosCondiciones" className="text-gray-900">
                  Acepto los{" "}
                  <a
                    href="/AvisoLegal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Terminos y condiciones
                  </a>
                </Label>
              </div>

              <div className="my-2 w-1/2 lg:w-1/4">
                <Button> Enviar mensaje</Button>
              </div>
            </form>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              variants={sectionVariants}
              className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-black  rounded-2xl"
            >
              <div className="flex flex-col text-white">
                <h1 className="font-bold uppercase text-4xl my-4">
                  Pasate por nuestra oficina
                </h1>
                <p className="text-gray-400">
                  Por favor contáctenos a los siguiente medios :
                </p>
                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <h2 className="text-2xl">Oficina</h2>
                    <a
                      href="https://maps.app.goo.gl/fwx7r3dFVHKkZJ3q8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#d8a325]"
                    >
                      <p className="">
                        Cra 5 N° 22 - 82 el Carmen, Ibagué Tolima{" "}
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <h2 className="text-2xl">Llamanos</h2>
                    <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                    <p className="text-gray-400">Cel: xxx-xxx-xxx</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
