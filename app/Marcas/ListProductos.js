"use client";
import CarrouslProductosImagenes from "@/components/CarrouslProductosImagenes";
import ComponentProducto from "@/components/ComponentProducto";
import React, { useState } from "react";

const ListProductos = ({ Productos, marca }) => {
  console.log("Productos", Productos);

  const [ShowModalProductos, setShowModalProductos] = useState({
    Visible: false,
    Producto: {},
  });
  return (
    <>
      {ShowModalProductos?.Visible && (
        <ComponentProducto
          ShowModalProductos={ShowModalProductos}
          setShowModalProductos={setShowModalProductos}
          marca={{
            NombreMarca: ShowModalProductos?.Producto?.Empresa,

            idMarca: ShowModalProductos?.Producto?.marcaId,
          }}
        />
      )}
      {Productos?.map((producto) => {
        const imagenes =
          producto?.ImagenesGenerales?.concat(producto?.Variantes) || [];

        const ImagenesFormated = imagenes.filter(
          (imagen) => imagen.url || imagen.length > 0
        );

        return (
          <div
            onClick={(e) => {
              e.preventDefault();
              setShowModalProductos({
                Visible: true,
                Producto: {
                  ...producto,
                  //   Categoria: Categoria,
                },
              });
            }}
            key={producto?.id}
            className="mx-auto w-full cursor-pointer  md:max-w-80 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg"
          >
            <CarrouslProductosImagenes Variantes={ImagenesFormated} />

            <div className="p-4">
              <h2 className="mb-2 text-lg font-bold    text-gray-900 uppercase">
                {producto?.NombreProducto}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: producto?.Description || "",
                }}
                className="mb-2 text-base  text-gray-700 line-clamp-3"
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListProductos;
