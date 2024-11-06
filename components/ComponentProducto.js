import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ShowProducto from "./ShowProducto";

const ComponentProducto = ({
  ShowModalProductos,
  setShowModalProductos,
  marca,
}) => {
  console.log("marca", marca);

  return (
    <Dialog
      open={ShowModalProductos?.Visible}
      onOpenChange={() => {
        setShowModalProductos({ Visible: false, Producto: {} });
      }}
    >
      <DialogContent className="max-w-7xl h-full max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Información del producto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ShowProducto
          product={ShowModalProductos?.Producto}
          CategoriaName={
            ShowModalProductos?.Producto?.Categoria?.NombreCategoria
          }
          Empresa={marca?.NombreMarca}
          idMarca={ShowModalProductos?.Producto?.marcaId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ComponentProducto;
