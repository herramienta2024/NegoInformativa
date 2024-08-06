"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgePlus,
  CircleHelpIcon,
  EyeIcon,
  PencilIcon,
  Sparkle,
  TrashIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalCategorias from "./ModalCategorias";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import ModalProducto from "./ModalProducto";
import Image from "next/image";

const Garden = () => {
  const [Categorias, setCategorias] = useState([]);
  const [Productos, setProductos] = useState([]);

  const [OpenModalCategoria, setOpenModalCategoria] = useState({
    Visible: false,
    InfoEditar: {},
  });
  const [OpenModalProducto, setOpenModalProducto] = useState({
    Visible: false,
    InfoEditar: {},
  });
  const [filteredItems, setFilteredItems] = useState([]);
  const [FilterByCategoria, setFilterByCategoria] = useState("");

  useEffect(() => {
    onSnapshot(
      collection(db, `Categorias`),
      // orderBy("email", "asc"),
      (snapshot) =>
        setCategorias(
          snapshot?.docs?.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );

    onSnapshot(
      collection(db, `Productos`),
      // orderBy("email", "asc"),
      (snapshot) => {
        const data = snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(data);
        setFilteredItems(data);
      }
    );
  }, []);

  useEffect(() => {
    if (FilterByCategoria == "Todos") {
      setFilteredItems(Productos);
    } else {
      const filteredItems = Productos.reduce((acc, item) => {
        if (FilterByCategoria == "Adicionales") {
          if (item.esAdicional == "Si") {
            acc.push(item);
          }
        } else {
          const Categoria =
            !FilterByCategoria || item.Categoria == FilterByCategoria;

          if (Categoria) {
            acc.push(item);
          }
        }
        return acc;
      }, []);

      setFilteredItems(filteredItems);
    }
  }, [FilterByCategoria, Productos]);
  return (
    <div>
      {OpenModalCategoria?.Visible && (
        <ModalCategorias
          OpenModalCategoria={OpenModalCategoria}
          setOpenModalCategoria={setOpenModalCategoria}
        />
      )}

      {OpenModalProducto?.Visible && (
        <ModalProducto
          OpenModalProducto={OpenModalProducto}
          setOpenModalProducto={setOpenModalProducto}
          Categorias={Categorias}
        />
      )}
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bienvenido al módulo de Garden</CardTitle>

            <CardDescription>
              En esta sección, puedes ver y modificar las Categorias y Productos
              .
            </CardDescription>
            <div className="flex gap-x-4">
              <Button
                title="Agregar nueva Categoria"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModalProducto({
                    Visible: true,
                    InfoEditar: {},
                  });
                }}
                className="space-x-2"
              >
                <BadgePlus />
                <p>Agregar Producto</p>
              </Button>

              <Button
                title="Agregar nueva Categoria"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModalCategoria({
                    Visible: true,
                    InfoEditar: {},
                  });
                }}
                className="space-x-2"
              >
                <BadgePlus />
                <p>Agregar Nueva Categoria</p>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Lista de Categorias </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4  ">
                <div className="w-full mx-auto border  border-gray-200 bg-white rounded-lg  shadow-md">
                  <div className="p-5">
                    <div>
                      <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
                        Todos
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-x-2 pb-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFilterByCategoria("Todos");
                      }}
                      className="bg-orange-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-orange-600"
                    >
                      <EyeIcon className=" h-4 w-4" />
                    </button>
                  </div>
                </div>
                {Categorias?.map((Categoria) => (
                  <div
                    key={Categoria.id}
                    className="w-full mx-auto border  border-gray-200 bg-white rounded-lg  shadow-md"
                  >
                    {Categoria?.Imagenes?.length > 0 && (
                      <section className="relative w-full h-[200px]">
                        <Image
                          className="rounded-t-lg "
                          fill
                          src={Categoria?.Imagenes[0] || ""}
                          alt="imageCategoria"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </section>
                    )}

                    <div className="p-5">
                      <div>
                        <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
                          {Categoria?.NombreCategoria}
                        </h1>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-x-2 pb-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setFilterByCategoria(Categoria.id);
                        }}
                        className="bg-orange-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-orange-600"
                      >
                        <EyeIcon className=" h-4 w-4" />
                      </button>
                      <button
                        title="Editar Categoria"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenModalCategoria({
                            Visible: true,
                            InfoEditar: Categoria,
                          });
                        }}
                        className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        title="Eliminar Categoria"
                        onClick={async (e) => {
                          e.preventDefault();

                          const Confirm = confirm(
                            `Esta Seguro de eliminar esta Categoria: ${Categoria.NombreCategoria}`
                          );
                          if (Confirm) {
                            await deleteDoc(
                              doc(db, "Categorias", `${Categoria.id}`)
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
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Lista de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="mx-auto grid  container  grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3  ">
                {filteredItems?.map((producto) => (
                  <div
                    key={producto.id}
                    className={`w-full h-full mx-auto shadow-md border  ${
                      producto?.Disponibilidad == "Si"
                        ? "bg-green-200 border-green-500 "
                        : (producto.Disponibilidad == "No" &&
                            "bg-red-200 border-red-500 ") ||
                          "bg-white"
                    }  border-gray-200 rounded-lg`}
                  >
                    <div className="">
                      {producto?.Imagenes?.length > 0 && (
                        <section className="relative w-full h-[200px]">
                          <Image
                            className="rounded-t-lg "
                            fill
                            src={producto?.Imagenes[0] || ""}
                            alt="imageCategoria"
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </section>
                      )}

                      <div className="py-2  px-5">
                        <div className="space-y-1">
                          <h1 className="text-gray-900 font-bold uppercase text-center text-2xl tracking-tight ">
                            {producto?.NombreProducto}
                          </h1>
                          <h1 className="capitalize">
                            <span className="font-semibold">Categoria: </span>
                            {Categorias.find(
                              (categoria) => producto.Categoria == categoria.id
                            )?.NombreCategoria || "Sin Categoria"}
                          </h1>
                          <p className="line-clamp-3">{producto.Descripcion}</p>

                          {/* Precio */}

                          {/* <p className="text-3xl m-0 font-normal text-end ">
                            S/ {producto?.Precio || 0}
                          </p> */}
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-x-2 pb-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setModalQuestion({
                              Visible: true,
                              Producto: producto,
                            });
                          }}
                          title="Imagenes Variantes"
                          className="bg-orange-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-orange-600"
                        >
                          <CircleHelpIcon className="w-4 h-4" />
                        </button>
                        <button
                          title={"Editar producto"}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenModalProducto({
                              Visible: true,
                              InfoEditar: producto,
                            });
                          }}
                          className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>

                        <button
                          title="Eliminar producto"
                          onClick={async (e) => {
                            e.preventDefault();

                            const Confirm = confirm(
                              `Esta Seguro de eliminar el producto: ${producto.NombreProducto}`
                            );
                            if (Confirm) {
                              const ImgRef = ref(
                                storage,
                                `Productos/${producto?.NombreProducto?.replace(
                                  /\s+/g,
                                  "_"
                                )}/`
                              );

                              await deleteDoc(
                                doc(db, "Productos", `${producto.id}`)
                              );

                              // Lista todos los objetos (archivos) en el directorio
                              listAll(ImgRef)
                                .then((res) => {
                                  res.items.forEach((itemRef) => {
                                    // Ahora debes borrar cada objeto (archivo)
                                    deleteObject(itemRef).catch((error) => {
                                      // Maneja cualquier error
                                      alert(
                                        ` Error al eliminar ${itemRef.fullPath}`
                                      );
                                      console.log(
                                        `Error al eliminar ${itemRef.fullPath}`,
                                        error
                                      );
                                    });
                                  });
                                })
                                .catch((error) => {
                                  // Maneja cualquier error
                                  console.error(
                                    "Error al listar los objetos",
                                    error
                                  );
                                });
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

export default Garden;
