"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TitleSection from "@/app/TitleSection";

const Producto = ({
  params: { id },
  searchParams: { CategoriaId, CategoriaName, ProductoNombre },
}) => {
  console.log("ProductoNombre", ProductoNombre);

  return (
    <div className="-mt-[72px] md:-mt-[90px] lg:-mt-[72px]">
      <TitleSection
        title={`${ProductoNombre}`}
        image="/Banners/BannersProductos.webp"
      />

      <div className="w-full h-80"></div>
    </div>
  );
};

export default Producto;
