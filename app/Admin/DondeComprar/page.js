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
import { collection, onSnapshot } from "firebase/firestore";
import { BadgePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalComprar from "./ModalComprar";

const DondeComprar = () => {
  const [Compras, setCompras] = useState([]);
  const [OpenModalCompra, setOpenModalCompra] = useState({
    Visible: false,
    InfoEditar: {},
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "DondeComprar"),
      (snapshot) => {
        const DondeComprarData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompras(DondeComprarData);
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
      {OpenModalCompra?.Visible && (
        <ModalComprar
          OpenModalCompra={OpenModalCompra}
          setOpenModalCompra={setOpenModalCompra}
        />
      )}

      <div className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bienvenido al módulo donde comprar</CardTitle>

            <CardDescription>
              En esta sección, puedes ver y modificar donde se puede comprar.
            </CardDescription>
            <div className="flex gap-x-4">
              <Button
                title="Agregar nueva ubicación"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModalCompra({
                    Visible: true,
                    InfoEditar: {},
                  });
                }}
                className="space-x-2"
              >
                <BadgePlus />
                <p>Agregar Nueva Ubicación</p>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Lista de ubicaciones </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6  md:grid-cols-3  ">
                {/* {Marcas?.map((Marca) => (
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
                          title="Sliders"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenModalSlider({
                              Visible: true,
                              InfoEditar: {
                                id: Marca.id,
                                NombreMarca: Marca?.NombreMarca || "",
                                Carrousel: Marca?.Carrousel || [],
                              },
                            });
                          }}
                          className="bg-yellow-800 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
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
                ))} */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DondeComprar;
