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
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { BadgePlus, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ModalCategorias from "./ModalCategorias";
import ModalProducto from "./ModalProducto";
import Image from "next/image";
import DeleteImagenes from "@/lib/DeleteImagenes";
import DeleteImagenesVariante from "@/lib/DeleteImagenesVariante";

const MarcaProductos = ({ params: { id } }) => {
  const [Marca, setMarca] = useState({});

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
    if (!id) return; // Verificar si 'id' está disponible

    const categoriasRef = collection(db, "Categorias");
    const productosRef = collection(db, "Productos");

    const categoriasQuery = query(categoriasRef, where("marcaId", "==", id));
    const productosQuery = query(productosRef, where("marcaId", "==", id));

    const unsubscribeCategorias = onSnapshot(categoriasQuery, (snapshot) => {
      setCategorias(
        snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    const unsubscribeProductos = onSnapshot(productosQuery, (snapshot) => {
      const data = snapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
      setFilteredItems(data);
    });

    const unsubscribe = onSnapshot(
      doc(db, "Marcas", id),
      (doc) => {
        setMarca(doc.data());
      },
      (error) => {
        console.error("Error fetching marca: ", error);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener

    return () => {
      unsubscribeCategorias(); // Desuscribirse al desmontar el componente
      unsubscribeProductos();
      unsubscribe();
    };
  }, [id]);

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
    <div className="space-y-6">
      {OpenModalCategoria?.Visible && (
        <ModalCategorias
          OpenModalCategoria={OpenModalCategoria}
          setOpenModalCategoria={setOpenModalCategoria}
          idMarca={id}
        />
      )}

      {OpenModalProducto?.Visible && (
        <ModalProducto
          OpenModalProducto={OpenModalProducto}
          setOpenModalProducto={setOpenModalProducto}
          Categorias={Categorias}
          idMarca={id}
        />
      )}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>
            Bienvenido a la marca{" "}
            <span className="uppercase ">{Marca?.NombreMarca}</span>
          </CardTitle>

          <CardDescription>
            En esta sección, puedes ver y modificar las Categorias y Productos.
          </CardDescription>
          <CardContent></CardContent>
        </CardHeader>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Lista de Categorias </CardTitle>
          <div className="flex gap-2 ">
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

            <Button
              onClick={(e) => {
                e.preventDefault();
                setFilterByCategoria("Todos");
              }}
              title="Todos los Productos"
            >
              <EyeIcon className=" " />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4  ">
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
                          await DeleteImagenes("");
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
          <div>
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
          </div>
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
                    {producto?.Variantes?.length > 0 && (
                      <section className="relative w-full h-[200px]">
                        <Image
                          className="rounded-t-lg "
                          fill
                          src={producto?.Variantes[0].url || ""}
                          alt="imageCategoria"
                          style={{
                            objectFit: "contain",
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
                        title={`Eliminar Producto ${producto?.NombreProducto}`}
                        onClick={async (e) => {
                          e.preventDefault();

                          const Confirm = confirm(
                            `Esta Seguro de eliminar el producto: ${producto?.NombreProducto}`
                          );
                          if (Confirm) {
                            await DeleteImagenesVariante(
                              producto?.NombreProducto?.replace(/\s+/g, "_"),
                              "Productos"
                            );

                            await deleteDoc(
                              doc(db, "Productos", `${producto?.id}`)
                            );
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
  );
};

export default MarcaProductos;
