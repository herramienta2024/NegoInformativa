"use client";
import { MapPinCheckIcon, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import InputBuscarProducto from "./InputBuscarProducto";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { usePathname } from "next/navigation";

const IconsMenu = ({ setOpenModalSearch }) => {
  const [Productos, setProductos] = useState([]);
  const ruta = usePathname();

  const IdMarca = ruta?.split("/")[2];
  console.log("Ruta: ", ruta);
  console.log("IdMarca: ", IdMarca);

  if (ruta?.includes("Marcas")) {
    console.log("Es una marca");
  } else {
    console.log("No es una marca");
  }

  const GetProductos = async () => {
    try {
      const producRef = collection(db, "Productos");
      const q = query(producRef, where("Estado", "==", "Activo"));
      const querySnapshot = await getDocs(q);

      const ProductosData = querySnapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(ProductosData);
    } catch (error) {
      console.error("Error fetching marcas: ", error);
    }
  };

  return (
    <div className="hidden lg:flex justify-center items-center gap-x-4 ">
      <div
        className="bg-red-900"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <InputBuscarProducto Productos={Productos} IconoTop={true} />
      </div>
      <MapPinCheckIcon
        onClick={(e) => {
          e.preventDefault();

          setOpenModalSearch(true);
        }}
        className="h-7 w-7 text-white cursor-pointer"
      />
      <Link href={"/Contacto"}>
        <PhoneCallIcon className="h-6 w-6 text-white" />
      </Link>
    </div>
  );
};

export default IconsMenu;
