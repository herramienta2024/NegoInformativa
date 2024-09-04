"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BadgePlus, PencilIcon, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalDondeComprar from "./ModalComprar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

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
        console.error("Error fetching compras: ", error);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, []);
  return (
    <div>
      {OpenModalCompra?.Visible && (
        <ModalDondeComprar
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

            <Input placeholder="Buscar por nombre" />
          </CardHeader>
          <CardContent>
            <div>
              <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6  md:grid-cols-3  ">
                {Compras?.map((compra) => (
                  <div
                    key={compra.id}
                    className={`w-full  border-gray-200 mx-auto border    rounded-lg  shadow-md`}
                    style={{
                      backgroundColor:
                        compra?.Estado == "Activo" ? "#bbf7d0" : "#fecaca",
                    }}
                  >
                    <div className="p-5">
                      <div>
                        <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
                          {compra?.NombreLocal || "Sin nombre"}
                        </h1>
                        <p>
                          <span className="text-xl font-semibold">
                            Dirección:
                          </span>
                          {compra?.NombreLocal}
                        </p>
                        <p>
                          <span className="text-xl font-semibold">
                            Telefono:
                          </span>
                          {compra?.Telefono}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-x-2">
                        <button
                          title="Editar compra"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenModalCompra({
                              Visible: true,
                              InfoEditar: compra,
                            });
                          }}
                          className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          title="Eliminar compra"
                          onClick={async (e) => {
                            e.preventDefault();

                            const Confirm = confirm(
                              `Esta Seguro de eliminar esta compra: ${compra.Nombrecompra}`
                            );
                            if (Confirm) {
                              await DeleteImagenes(
                                compra?.Nombrecompra?.replace(/\s+/g, "_"),
                                "compras"
                              );
                              await deleteDoc(
                                doc(db, "compras", `${compra.id}`)
                              );

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

export default DondeComprar;
