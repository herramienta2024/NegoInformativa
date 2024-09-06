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
import React, { useState } from "react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";
import FileUploader from "@/app/FileUploader";
import uploadImages from "@/lib/UploadImagenes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { deleteObject, listAll, ref } from "firebase/storage";
import FileUploaderSubLogo from "./FIleUploaderSubLogo";
import FileUploaderLogoPrincipal from "./FileUploaderLogoPrincipal";

const ModalMarcas = ({ OpenModalMarcas, setOpenModalMarcas }) => {
  const [InputValues, setInputValues] = useState({});
  const [files, setFiles] = useState([]);

  const [SubLogo, setSubLogo] = useState([]);

  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();

  const closeOpenModalMarcas = () => {
    setOpenModalMarcas({
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

  const deleteExistingImages = async (folderName, collectionName) => {
    try {
      const imagesRef = ref(storage, `${collectionName}/${folderName}`);

      // Obtén la lista de todos los archivos en la carpeta
      const imagesList = await listAll(imagesRef);

      // Elimina cada archivo encontrado en la lista
      const deletePromises = imagesList.items.map((item) => deleteObject(item));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error eliminando imágenes:", error);
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isEditing = Object.keys(OpenModalMarcas?.InfoEditar).length > 0;

      if (isEditing) {
        let updateData = {};
        const marcaId = OpenModalMarcas?.InfoEditar?.id;
        const nombreActual =
          OpenModalMarcas?.InfoEditar?.NombreMarca?.replace(/\s+/g, "_") || "";
        const nombreNuevo =
          InputValues?.NombreMarca?.replace(/\s+/g, "_") || nombreActual;

        // Actualizar campos de la marca si hay cambios
        if (Object.keys(InputValues).length > 0) {
          const updateRef = doc(db, "Marcas", marcaId);
          updateData = { ...InputValues };

          // Actualizar el documento en Firestore
          await updateDoc(updateRef, updateData);
        }

        // Manejar la actualización de las imágenes
        if (files?.length > 0) {
          await deleteExistingImages(nombreActual, "Marcas");
          const imagesUrl = await uploadImages(files, nombreNuevo, "Marcas");

          const updateRef = doc(db, "Marcas", marcaId);
          await updateDoc(updateRef, {
            Imagenes: imagesUrl || [],
          });
        }
        if (SubLogo?.length > 0) {
          await deleteExistingImages(nombreActual, "Marcas/SubLogo");
          const imagesUrl = await uploadImages(
            SubLogo,
            nombreNuevo,
            "Marcas/SubLogo"
          );

          const updateRef = doc(db, "Marcas", marcaId);
          await updateDoc(updateRef, {
            SubLogo: imagesUrl || [],
          });
        }

        closeOpenModalMarcas();
        return;
      }

      if (!files?.length > 0) {
        return toast({
          title: "Alerta",
          description: "Por favor seleccione una imagen para la categoría",
        });
      }

      const nombreCarpeta = InputValues?.NombreMarca?.replace(/\s+/g, "_");
      const imagesUrl = await uploadImages(files, nombreCarpeta, "Marcas");

      const response = await addDoc(collection(db, "Marcas"), {
        ...InputValues,
        Imagenes: imagesUrl,
        createdAt: serverTimestamp(),
      });

      const nombreNuevo =
        InputValues?.NombreMarca?.replace(/\s+/g, "_") || nombreActual;

      if (SubLogo?.length > 0) {
        const imagesUrl = await uploadImages(
          SubLogo,
          nombreNuevo,
          "Marcas/SubLogo"
        );

        const updateRef = doc(db, "Marcas", `${response.id}`);
        await updateDoc(updateRef, {
          SubLogo: imagesUrl || [],
        });
      }

      // Creación de una nueva marca

      closeOpenModalMarcas();
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
    <Dialog open={OpenModalMarcas?.Visible} onOpenChange={closeOpenModalMarcas}>
      <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModalMarcas?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            una marca
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handlerSubmit} className="space-y-4 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="NombreMarca" className="">
                Nombre del la Marca
                <span className="text-red-600">(*)</span>
              </Label>
              <Input
                id="NombreMarca"
                name="NombreMarca"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalMarcas?.InfoEditar?.NombreMarca}
                required
                autoComplete="off"
                autoFocus
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Slogan" className="">
                Slogan de la marca
              </Label>
              <Input
                id="Slogan"
                name="Slogan"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalMarcas?.InfoEditar?.Slogan}
                autoComplete="off"
                type="text"
              />
            </div>

            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="Estado" className="">
                Estado
              </Label>
              <Select
                value={
                  InputValues?.Estado || OpenModalMarcas?.InfoEditar?.Estado
                }
                onValueChange={(e) => {
                  setInputValues({
                    ...InputValues,
                    Estado: e,
                  });
                }}
                id="Categoria"
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Define categoría del producto" />
                </SelectTrigger>
                <SelectContent>
                  {[{ label: "Activo" }, { label: "Inactivo" }].map(
                    (estado) => (
                      <SelectItem key={estado.label} value={estado.label}>
                        {estado.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="ColorMarca" className="">
                Color Principal de la Marca{" "}
                <span className="text-red-600">(*)</span>
              </Label>
              <Input
                id="ColorMarca"
                name="ColorMarca"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalMarcas?.InfoEditar?.ColorMarca}
                required
                autoComplete="off"
                type="color"
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="Imagenes">
                Logo Marca <span className="text-red-600"> (*)</span>
              </Label>

              <FileUploaderLogoPrincipal
                Color={
                  InputValues?.ColorMarca ||
                  OpenModalMarcas?.InfoEditar?.ColorMarca
                }
                setFiles={setFiles}
                files={files}
                Modal={OpenModalMarcas}
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="ColorContraste" className="">
                Color Contraste Blanco - Sub Color
              </Label>
              <Input
                id="ColorContraste"
                name="ColorContraste"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalMarcas?.InfoEditar?.ColorContraste}
                autoComplete="off"
                type="color"
              />
            </div>

            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="Imagenes">
                Logo Contraste Blanco - Sub Logo{" "}
              </Label>

              <FileUploaderSubLogo
                Color={
                  InputValues?.ColorContraste ||
                  OpenModalMarcas?.InfoEditar?.ColorContraste
                }
                setFiles={setSubLogo}
                files={SubLogo}
                Modal={OpenModalMarcas}
              />
            </div>

            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="Descripcion" className="">
                Descripción de la marca
              </Label>
              <Textarea
                id="Descripcion"
                name="Descripcion"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalMarcas?.InfoEditar?.Descripcion}
                required
                autoComplete="off"
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

export default ModalMarcas;
