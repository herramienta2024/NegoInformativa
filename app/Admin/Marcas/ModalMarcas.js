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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ModalMarcas = ({ OpenModalMarcas, setOpenModalMarcas }) => {
  const [InputValues, setInputValues] = useState({});
  const [files, setFiles] = useState([]);

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

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (Object.keys(OpenModalMarcas?.InfoEditar).length > 0) {
        if (Object.keys(InputValues).length > 0) {
          const UpdateRef = doc(
            db,
            "Marcas",
            `${OpenModalMarcas?.InfoEditar?.id}`
          );
          // Set the "capital" field of the city 'DC'

          await updateDoc(UpdateRef, {
            ...InputValues,
          });
        }
        if (files?.length > 0) {
          const NombreArchivo =
            OpenModalMarcas?.InfoEditar?.NombreCategoria?.replace(
              /\s+/g,
              "_"
            ) || "";
          const NombreNuevo =
            InputValues?.NombreCategoria?.replace(/\s+/g, "_") || NombreArchivo;

          await DeleteImagenes(NombreArchivo, "Marcas");

          const ImagesUrl = await uploadImages(files, NombreNuevo, "Marcas");

          const UpdateRef = doc(
            db,
            "Marcas",
            `${OpenModalMarcas?.InfoEditar?.id}`
          );
          await updateDoc(UpdateRef, {
            Imagenes: ImagesUrl || [],
          });
        }

        closeOpenModalMarcas();

        return;
      } else {
        if (!files?.length > 0) {
          toast({
            title: "Alerta",
            description: "Por favor seleccione una imágen para la categoria",
          });
        }

        const NombreCarpeta = InputValues?.NombreMarca?.replace(/\s+/g, "_");

        const ImagesUrl = await uploadImages(files, NombreCarpeta, "Marcas"); // Asegúrate de que la promesa se haya resuelto

        const docRef = await addDoc(collection(db, "Marcas"), {
          ...InputValues,
          Imagenes: ImagesUrl,
          createdAt: serverTimestamp(),
        });
      }
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
        <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
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
              <FileUploader
                setFiles={setFiles}
                files={files}
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
