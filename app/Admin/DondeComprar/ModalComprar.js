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
import { useState } from "react";

const ModalComprar = ({ OpenModalCompra, setOpenModalCompra }) => {
  const [InputValues, setInputValues] = useState({});
  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();

  const Roles = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Editor",
      label: "Editor",
    },
  ];

  const closeModal = () => {
    setOpenModalCompra({
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
    } catch (error) {}
  };
  return (
    <Dialog open={OpenModalCompra?.Visible} onOpenChange={closeModal}>
      <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModalCompra?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            un usuario
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="NombreSitio" className="">
                Nombre de Local <span className="text-red-600"> (*)</span>
              </Label>
              <Input
                id="NombreSitio"
                name="NombreSitio"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                required
                autoComplete="off"
                autoFocus
                defaultValue={OpenModalCompra?.InfoEditar?.NombreSitio}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Direccion" className="">
                Dirección <span className="text-red-600"> (*)</span>
              </Label>
              <Input
                id="Direccion"
                name="Direccion"
                className="w-full text-gray-900"
                onChange={HandlerChange}
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

export default ModalComprar;
