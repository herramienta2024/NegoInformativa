"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/firebase/firebaseClient";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { BadgePlus, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalMarcas from "./ModalMarcas";
import Image from "next/image";
import DeleteImagenes from "@/lib/DeleteImagenes";
import { cn } from "@/lib/utils";

const Marcas = () => {
  const [OpenModalMarcas, setOpenModalMarcas] = useState({
    Visible: false,
    InfoEditar: {},
  });

  const [Marcas, setMarcas] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Marcas"),
      (snapshot) => {
        const marcasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMarcas(marcasData);
      },
      (error) => {
        console.error("Error fetching marcas: ", error);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, []);
  return (
    <div>
      {OpenModalMarcas?.Visible && (
        <ModalMarcas
          OpenModalMarcas={OpenModalMarcas}
          setOpenModalMarcas={setOpenModalMarcas}
        />
      )}

      <div className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bienvenido al módulo de Garden</CardTitle>

            <CardDescription>
              En esta sección, puedes ver y modificar las Marcas y Productos.
            </CardDescription>
            <div className="flex gap-x-4">
              <Button
                title="Agregar nueva Marca"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModalMarcas({
                    Visible: true,
                    InfoEditar: {},
                  });
                }}
                className="space-x-2"
              >
                <BadgePlus />
                <p>Agregar Marca</p>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Lista de Marcas </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6  md:grid-cols-3  ">
                {Marcas?.map((Marca) => (
                  <div
                    key={Marca.id}
                    className={`w-full  border-gray-200 mx-auto border    rounded-lg  shadow-md`}
                  >
                    {Marca?.Imagenes?.length > 0 && (
                      <section
                        className={cn("rounded-lg relative w-full h-[200px]")}
                        style={{
                          backgroundColor: Marca?.ColorMarca || "black",
                        }}
                      >
                        <Image
                          className="rounded-t-lg "
                          fill
                          src={Marca?.Imagenes[0] || ""}
                          alt="imageMarca"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </section>
                    )}

                    <div
                      className="p-5"
                      style={{
                        backgroundColor:
                          Marca?.Estado == "Activo" ? "#bbf7d0" : "#fecaca",
                      }}
                    >
                      <div>
                        <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
                          {Marca?.NombreMarca}
                        </h1>
                      </div>
                      <div className="flex items-center justify-center gap-x-2">
                        <button
                          title="Editar Marca"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenModalMarcas({
                              Visible: true,
                              InfoEditar: Marca,
                            });
                          }}
                          className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          title="Eliminar Marca"
                          onClick={async (e) => {
                            e.preventDefault();

                            const Confirm = confirm(
                              `Esta Seguro de eliminar esta Marca: ${Marca.NombreMarca}`
                            );
                            if (Confirm) {
                              await DeleteImagenes(
                                Marca?.NombreMarca?.replace(/\s+/g, "_"),
                                "Marcas"
                              );
                              await deleteDoc(doc(db, "Marcas", `${Marca.id}`));

                              // Lista todos los objetos (archivos) en el directorio
                            }
                          }}
                          className="bg-red-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-red-600"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Marcas;
