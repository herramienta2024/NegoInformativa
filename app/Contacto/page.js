"use client";
import { Input } from "@/components/ui/input";
import TitleSection from "../TitleSection";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

const Contacto = () => {
  const [InputValues, setInputValues] = useState({});

  const HandlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px] bg-gray-50 w-full h-full">
      <TitleSection title={`Contacto`} image="/Banners/BannerContacto.webp" />
      <div>
        {/* component */}
        <div className="flex justify-center items-center  bg-white">
          {/* COMPONENT CODE */}
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Mensaje enviado");
              }}
              className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl"
            >
              <div className="flex">
                <h1 className="font-bold uppercase text-5xl">
                  Enviamos un <br /> mensaje
                </h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              </div>

              <div className="my-2 w-1/2 lg:w-1/4">
                <Button> Enviar mensaje</Button>
              </div>
            </form>
            <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-black  rounded-2xl">
              <div className="flex flex-col text-white">
                <h1 className="font-bold uppercase text-4xl my-4">
                  Drop in our office
                </h1>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam tincidunt arcu diam, eu feugiat felis fermentum id.
                  Curabitur vitae nibh viverra, auctor turpis sed, scelerisque
                  ex.
                </p>
                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-map-marker-alt pt-2 pr-2"></i>
                  </div>
                  <i className="fas fa-map-marker-alt pt-2 pr-2">
                    <div className="flex flex-col">
                      <h2 className="text-2xl">Main Office</h2>
                      <p className="text-gray-400">
                        5555 Tailwind RD, Pleasant Grove, UT 73533
                      </p>
                    </div>
                  </i>
                </div>
                <i className="fas fa-map-marker-alt pt-2 pr-2">
                  <div className="flex my-4 w-2/3 lg:w-1/2">
                    <div className="flex flex-col">
                      <i className="fas fa-phone-alt pt-2 pr-2"></i>
                    </div>
                    <i className="fas fa-phone-alt pt-2 pr-2">
                      <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us</h2>
                        <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                        <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
                      </div>
                    </i>
                  </div>
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
