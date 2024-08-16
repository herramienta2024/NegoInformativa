import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { formats, modules } from "@/lib/QuillConfig";

import "react-quill/dist/quill.snow.css";
import FileUploaderProductos from "./FileUploaderProductos";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const ModalProducto = ({
  OpenModalProducto,
  setOpenModalProducto,
  Categorias,
  idMarca,
}) => {
  const [InputValues, setInputValues] = useState({
    Variantes: OpenModalProducto?.InfoEditar?.Variantes || [],
    TextoOpcion: "",
  });

  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [Marcas, setMarcas] = useState([]);

  useEffect(() => {
    if (!Object.keys(OpenModalProducto?.InfoEditar).length > 0) {
      return;
    }
    onSnapshot(
      collection(db, `Marcas`),
      // orderBy("email", "asc"),
      (snapshot) =>
        setMarcas(
          snapshot?.docs?.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [Object.keys(OpenModalProducto?.InfoEditar).length]);

  const closeOpenModalProducto = () => {
    setOpenModalProducto({
      Visible: false,
      InfoEditar: {},
    });
    setInputValues({});
  };
  const HandlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImages = async (images, NombreCarpeta, variante) => {
    // Seleccionamos solo la primera imagen de la lista
    const image = images;

    if (!image) {
      return [{}]; // Si no hay imagen, retornamos un array vacío
    }

    const imageRef = ref(
      storage,
      `Productos/${NombreCarpeta}/${variante?.Nombre?.replace(
        /\s+/g,
        "_"
      )}/image.jpg`
    );

    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);

    // Retornamos un array con un solo objeto que contiene la URL y la información de la variante
    return {
      url,
      Nombre: variante?.Nombre,
      key: variante?.id || 0,
    };
  };

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (Object.keys(OpenModalProducto?.InfoEditar).length > 0) {
        const UpdateRef = doc(
          db,
          "Productos",
          `${OpenModalProducto?.InfoEditar?.id}`
        );
        console.log(
          "OpenModalProducto?.InfoEditar?.id",
          OpenModalProducto?.InfoEditar?.id
        );

        // Eliminar de inputValues "TextoOpcion" para no enviarlo a la base de datos , input values es un objeto

        if (Object.keys(InputValues).length > 2) {
          await updateDoc(UpdateRef, {
            ...InputValues,
          });
        }

        if (InputValues?.Variantes?.length > 0) {
          let FilesUpload = [];

          for (const variante of InputValues?.Variantes) {
            if (variante?.Imagenes?.length > 0) {
              const ImagenesSubi = variante?.Imagenes?.find(
                (image) => image instanceof File
              );

              if (ImagenesSubi) {
                const NombreCarpeta =
                  InputValues?.NombreProducto?.replace(/\s+/g, "_") ||
                  OpenModalProducto?.InfoEditar?.NombreProducto?.replace(
                    /\s+/g,
                    "_"
                  );

                const ImagesUrl = await uploadImages(
                  ImagenesSubi,
                  NombreCarpeta,
                  variante
                );

                console.log("ImagesUrl", ImagesUrl);

                FilesUpload.push(ImagesUrl);
              }
            } else {
              console.log("Variante aaa", variante);

              FilesUpload.push({
                ...variante,
              });
            }
          }

          await updateDoc(UpdateRef, {
            Variantes: FilesUpload || [],
          });
        }

        closeOpenModalProducto();
        return;
      } else {
        if (Object.keys(InputValues).length > 2) {
          let FilesUpload = [];
          if (InputValues?.Variantes?.length > 0) {
            for (const variante of InputValues?.Variantes) {
              if (variante?.Imagenes?.length > 0) {
                const ImagenesSubi = variante?.Imagenes?.find(
                  (image) => image instanceof File
                );

                if (ImagenesSubi) {
                  const NombreCarpeta =
                    InputValues?.NombreProducto?.replace(/\s+/g, "_") ||
                    OpenModalProducto?.InfoEditar?.NombreProducto?.replace(
                      /\s+/g,
                      "_"
                    );

                  const ImagesUrl = await uploadImages(
                    ImagenesSubi,
                    NombreCarpeta,
                    variante
                  );

                  console.log("ImagesUrl", ImagesUrl);

                  FilesUpload.push(ImagesUrl);
                }
              } else {
                FilesUpload.push({
                  ...variante,
                });
              }
            }
          }

          // Add a new document with a generated id.
          const docRef = await addDoc(collection(db, "Productos"), {
            ...InputValues,
            Variantes: FilesUpload || InputValues?.Variantes || [],
            Empresa: "Garden",
            marcaId: idMarca,
          });

          closeOpenModalProducto();
        }
      }
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: err?.error?.errorInfo?.code || "Internal Server Error",
        description: err?.error?.errorInfo?.message || "Contacte con soporte",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={OpenModalProducto?.Visible}
      onOpenChange={closeOpenModalProducto}
    >
      <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModalProducto?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            un producto
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.keys(OpenModalProducto?.InfoEditar).length > 0 && (
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="marcaId" className="">
                  Marca{" "}
                </Label>
                <Select
                  value={
                    InputValues?.marcaId ||
                    OpenModalProducto?.InfoEditar?.marcaId
                  }
                  onValueChange={(e) => {
                    setInputValues({
                      ...InputValues,
                      marcaId: e,
                    });
                  }}
                  id="marcaId"
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Define categoría del producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {Marcas?.map((marca) => (
                      <SelectItem key={marca.id} value={marca.id}>
                        {marca.NombreMarca}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="NombreProducto" className="">
                Nombre del producto <span className="text-red-600">(*)</span>
              </Label>
              <Input
                id="NombreProducto"
                name="NombreProducto"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalProducto?.InfoEditar?.NombreProducto}
                required
                autoComplete="off"
                autoFocus
                type="text"
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="Precio" className="">
                Precio S/ <span className="text-red-600">(*)</span>
              </Label>
              <Input
                id="Precio"
                name="Precio"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalProducto?.InfoEditar?.Precio}
                required
                autoComplete="off"
                type="number"
                step="0.01"
              />
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="Categoria" className="">
                Categoria
              </Label>
              <Select
                value={
                  InputValues?.Categoria ||
                  OpenModalProducto?.InfoEditar?.Categoria
                }
                onValueChange={(e) => {
                  setInputValues({
                    ...InputValues,
                    Categoria: e,
                  });
                }}
                id="Categoria"
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Define categoría del producto" />
                </SelectTrigger>
                <SelectContent>
                  {Categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.NombreCategoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="lg:col-span-2">
              <Label htmlFor="Imagenes">
                Imagen Principal <span className="text-red-600"> (*)</span>
              </Label>
              <FileUploader
                setFiles={setFiles}
                files={files}
                Modal={OpenModalProducto}
              />
            </div> */}

            <div className="w-full mx-auto lg:col-span-2">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Variantes </h1>
                <div className="mt-4 flex">
                  <input
                    className="w-full border-b-2 border-gray-500 text-black px-2"
                    type="text"
                    placeholder="Ingresa la opción ?"
                    onChange={(e) => {
                      setInputValues({
                        ...InputValues,
                        TextoOpcion: e.target.value,
                      });
                    }}
                    value={InputValues?.TextoOpcion}
                  />
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!InputValues?.TextoOpcion) return;

                      setInputValues({
                        ...InputValues,
                        Variantes: [
                          ...InputValues?.Variantes,
                          {
                            id: InputValues?.Variantes.length + 1,
                            Nombre: InputValues?.TextoOpcion,
                          },
                        ],
                        TextoOpcion: "",
                      });
                    }}
                    className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
                  >
                    <svg
                      className="h-6 w-6"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx={12} cy={12} r={9} />{" "}
                      <line x1={9} y1={12} x2={15} y2={12} />{" "}
                      <line x1={12} y1={9} x2={12} y2={15} />
                    </svg>
                    <span>Add</span>
                  </button>
                </div>
              </div>
              <div className="mt-4 ">
                <ul className="grid lg:grid-cols-2 gap-3">
                  {InputValues?.Variantes?.map((opcion, key) => (
                    <li key={key} className="p-2 rounded-lg">
                      <div className="flex flex-col align-middle justify-between border border-gray-300  rounded-md">
                        <div className="p-2">
                          <p className="text-lg text-black capitalize">
                            {opcion?.Nombre || ""}
                          </p>
                          <div className="pt-2">
                            <FileUploaderProductos
                              setInputValues={setInputValues}
                              index={key}
                              InputValues={InputValues}
                              opcion={opcion}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center gap-x-2 pb-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setInputValues({
                                ...InputValues,
                                Variantes: InputValues?.Variantes.filter(
                                  (item, index) => index !== key
                                ),
                              });
                            }}
                            className="flex text-red-500 border-2 border-red-500 p-2 rounded-lg"
                          >
                            <svg
                              className="h-6 w-6 text-red-500"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {" "}
                              <circle cx={12} cy={12} r={10} />{" "}
                              <line x1={15} y1={9} x2={9} y2={15} />{" "}
                              <line x1={9} y1={9} x2={15} y2={15} />
                            </svg>
                            <span>Eliminar Variante</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="ContenidoBLog" className="">
                Contenido <span className="text-red-600">(*)</span>
              </Label>
              <QuillNoSSRWrapper
                id="ContenidoBLog"
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="Escriba aqui..."
                onChange={(e) => {
                  setInputValues({
                    ...InputValues,
                    Description: e,
                  });
                }}
                className="text-black   min-h-32"
                defaultValue={OpenModalProducto?.InfoEditar?.Description}
              />
            </div>
          </div>

          <Button
            disabled={Loading}
            className="   disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            Guardar{" "}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalProducto;
