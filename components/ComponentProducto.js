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
import { usePathname } from "next/navigation";

const ShowInfoProducto = ({ product, CategoriaName, Empresa, idMarca }) => {
  const router = useRouter();
  const pathname = usePathname();

  function onDismiss() {
    router.back();
  }
  return (
    <Dialog
      open={pathname.includes("show") ? true : false}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onDismiss();
        }
      }}
    >
      <DialogContent className="max-w-7xl h-full max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Información del producto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ShowProducto
          product={product}
          CategoriaName={CategoriaName}
          Empresa={Empresa}
          idMarca={idMarca}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShowInfoProducto;
