"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import ShowProducto from "./ShowProducto";

const ShowInfoProducto = ({ product, CategoriaName, Empresa }) => {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }
  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onDismiss();
        }
      }}
    >
      <DialogContent className="max-w-7xl overflow-auto">
        <DialogHeader>
          <DialogTitle>Información del producto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ShowProducto
          product={product}
          CategoriaName={CategoriaName}
          Empresa={Empresa}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShowInfoProducto;
