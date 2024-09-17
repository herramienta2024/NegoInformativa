"use client";
import { MapPinCheckIcon, PhoneCallIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import InputBuscarProducto from "./InputBuscarProducto";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { usePathname } from "next/navigation";

const IconsMenu = ({ setOpenModalSearch }) => {
  const [Productos, setProductos] = useState([]);
  const ruta = usePathname();

  console.log("Pro,Productos", Productos);

  const IdMarca = ruta?.split("/")[2];

  const IsMarca = ruta.includes("Marcas");

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
      <div>
        {IsMarca && IdMarca ? (
          <Link href={`/Marcas/${IdMarca}/Productos`}>
            <SearchIcon className="h-7 w-7 text-white" />
          </Link>
        ) : (
          <>
            <InputBuscarProducto
              Productos={Productos}
              IconoTop={true}
              GetProductos={GetProductos}
            />
          </>
        )}
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
