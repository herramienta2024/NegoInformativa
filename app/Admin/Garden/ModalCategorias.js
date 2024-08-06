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
import FileUploader from "../FileUploader";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";

const ModalCategorias = ({ OpenModalCategoria, setOpenModalCategoria }) => {
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

          if (Object.keys(InputValues).length > 0) {
            await updateDoc(UpdateRef, {
              ...InputValues,
            });
          }
        }
      } else {
        const docRef = await addDoc(collection(db, "Categorias"), {
          ...InputValues,
          createdAt: serverTimestamp(),
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
