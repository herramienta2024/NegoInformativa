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
import { db } from "@/firebase/firebaseClient";
import FileUploader from "@/app/FileUploader";
import uploadImages from "@/lib/UploadImagenes";
import DeleteImagenes from "@/lib/DeleteImagenes";

const ModalCategorias = ({
  OpenModalCategoria,
  setOpenModalCategoria,
  idMarca,
}) => {
  const [InputValues, setInputValues] = useState({});
  const [files, setFiles] = useState([]);

  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();

  const closeOpenModalCategoria = () => {
    setOpenModalCategoria({
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

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (Object.keys(OpenModalCategoria?.InfoEditar).length > 0) {
        if (Object.keys(InputValues).length > 0) {
          const UpdateRef = doc(
            db,
            "Categorias",
            `${OpenModalCategoria?.InfoEditar?.id}`
          );
          // Set the "capital" field of the city 'DC'

          await updateDoc(UpdateRef, {
            ...InputValues,
          });
        }
        if (files?.length > 0) {
          const NombreArchivo =
            OpenModalCategoria?.InfoEditar?.NombreCategoria?.replace(
              /\s+/g,
              "_"
            ) || "";
          const NombreNuevo =
            InputValues?.NombreCategoria?.replace(/\s+/g, "_") || NombreArchivo;

          await DeleteImagenes(NombreArchivo, "Categorias");

          const ImagesUrl = await uploadImages(
            files,
            NombreNuevo,
            "Categorias"
          );

          const UpdateRef = doc(
            db,
            "Categorias",
            `${OpenModalCategoria?.InfoEditar?.id}`
          );
          await updateDoc(UpdateRef, {
            Imagenes: ImagesUrl || [],
          });
        }

        closeOpenModalCategoria();

        return;
      } else {
        if (!files?.length > 0) {
          toast({
            title: "Alerta",
            description: "Por favor seleccione una imágen para la categoria",
          });
        }

        const NombreCarpeta = InputValues?.NombreCategoria?.replace(
          /\s+/g,
          "_"
        );

        const ImagesUrl = await uploadImages(
          files,
          NombreCarpeta,
          "Categorias"
        ); // Asegúrate de que la promesa se haya resuelto

        const docRef = await addDoc(collection(db, "Categorias"), {
          ...InputValues,
          Imagenes: ImagesUrl,
          createdAt: serverTimestamp(),
          marcaId: idMarca,
        });
      }
      closeOpenModalCategoria();
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
      open={OpenModalCategoria?.Visible}
      onOpenChange={closeOpenModalCategoria}
    >
      <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModalCategoria?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            una categoria
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="NombreCategoria" className="">
                Nombre del la categoria{" "}
                <span className="text-red-600">(*)</span>
              </Label>
              <Input
                id="NombreCategoria"
                name="NombreCategoria"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalCategoria?.InfoEditar?.NombreCategoria}
                required
                autoComplete="off"
                autoFocus
                type="text"
              />
            </div>

            <div>
              <Label htmlFor="Imagenes">
                Imagen Principal <span className="text-red-600"> (*)</span>
              </Label>
              <FileUploader
                setFiles={setFiles}
                files={files}
                Modal={OpenModalCategoria}
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

export default ModalCategorias;
