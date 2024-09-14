import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { deleteObject, listAll, ref } from "firebase/storage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpploadVideos from "./FileUploadVideos";
import { Input } from "@/components/ui/input";

const ModalSlider = ({ OpenModalSlider, setOpenModalSlider }) => {
  const [files, setFiles] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [InputValues, setInputValues] = useState({});
  const { toast } = useToast();

  console.log(files);

  const closeModalSlider = () => {
    setOpenModalSlider({
      Visible: false,
      InfoEditar: {},
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
      const isEditing = Object.keys(OpenModalSlider?.InfoEditar).length > 0;

      if (isEditing) {
        // Manejar la actualización de las imágenes
        if (files?.length > 0) {
          const nombreActual =
            OpenModalSlider?.InfoEditar?.NombreMarca?.replace(/\s+/g, "_") ||
            "";
          const nombreNuevo = nombreActual;

          //Verificar si hay imagenes o videos en los files

          const Videos = files.filter((file) => file.type.includes("video"));

          const Imagenes = files.filter((file) => file.type.includes("image"));

          if (Imagenes?.length > 0) {
            await deleteExistingImages(nombreActual, "Slider");
            const imagesUrl = await uploadImages(files, nombreNuevo, "Slider");

            const updateRef = doc(
              db,
              "Marcas",
              OpenModalSlider?.InfoEditar?.id
            );
            await updateDoc(updateRef, {
              Carrousel: imagesUrl || [],
            });
          }
          if (Videos?.length > 0) {
            await deleteExistingImages(nombreActual, "Videos");
            const imagesUrl = await uploadImages(files, nombreNuevo, "Videos");

            const updateRef = doc(
              db,
              "Marcas",
              OpenModalSlider?.InfoEditar?.id
            );
            await updateDoc(updateRef, {
              VideoCarrousel: imagesUrl || [],
              ...InputValues,
            });
          }
        }

        closeModalSlider();
        return;
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
    <Dialog open={OpenModalSlider?.Visible} onOpenChange={closeModalSlider}>
      <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle className="uppercase">
            {Object.keys(OpenModalSlider?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            Carrousel {OpenModalSlider?.InfoEditar?.NombreMarca}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handlerSubmit} className="space-y-4 w-full h-full">
          <div className="space-y-2 ">
            <Label htmlFor="TipoBanner" className="">
              Tipo Banner
            </Label>
            <Select
              value={InputValues?.TipoBanner}
              defaultValue={OpenModalSlider?.InfoEditar?.TipoBanner}
              onValueChange={(e) => {
                setInputValues({
                  ...InputValues,
                  TipoBanner: e,
                });
              }}
              id="TipoBanner"
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                {[{ label: "Imagen" }, { label: "Video" }].map((estado) => (
                  <SelectItem key={estado.label} value={estado.label}>
                    {estado.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="Imagenes">
                Carrousel <span className="text-red-600"> (*)</span>
              </Label>
              {InputValues?.TipoBanner == "Imagen" ? (
                <>
                  {" "}
                  <FileUploader
                    setFiles={setFiles}
                    files={files}
                    Modal={OpenModalSlider}
                  />
                </>
              ) : (
                <>
                  {InputValues?.TipoBanner == "Video" && (
                    <>
                      <div className="space-y-2 ">
                        <Label htmlFor="TiempoVideo" className="">
                          Tiempo de duración del video{" "}
                        </Label>

                        {/* Input para poner el tiempo del video */}
                        <Input
                          type="number"
                          id="TiempoVideo"
                          name="TiempoVideo"
                          placeholder="Tiempo en segundos"
                          value={InputValues?.TiempoVideo}
                          onChange={(e) => {
                            setInputValues({
                              ...InputValues,
                              TiempoVideo: e.target.value,
                            });
                          }}
                          defaultValue={
                            OpenModalSlider?.InfoEditar?.TiempoVideo
                          }
                          required
                        />
                      </div>
                      <FileUpploadVideos
                        setFiles={setFiles}
                        files={files}
                        Modal={OpenModalSlider}
                      />
                    </>
                  )}
                </>
              )}
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

export default ModalSlider;
