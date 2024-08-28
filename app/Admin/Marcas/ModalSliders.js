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

const ModalSlider = ({ OpenModalSlider, setOpenModalSlider }) => {
  console.log("OpenModalSlider", OpenModalSlider);

  const [files, setFiles] = useState([]);

  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();

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

          await deleteExistingImages(nombreActual, "Slider");
          const imagesUrl = await uploadImages(files, nombreNuevo, "Slider");

          const updateRef = doc(db, "Marcas", OpenModalSlider?.InfoEditar?.id);
          await updateDoc(updateRef, {
            Carrousel: imagesUrl || [],
          });
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="Imagenes">
                Carrousel <span className="text-red-600"> (*)</span>
              </Label>
              <FileUploader
                setFiles={setFiles}
                files={files}
                Modal={OpenModalSlider}
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

export default ModalSlider;
