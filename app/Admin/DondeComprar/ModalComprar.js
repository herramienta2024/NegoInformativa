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
import React, { useEffect, useState } from "react";

import useDebounce from "@/lib/useDebounce";
import {
  addDoc,
  collection,
  doc,
  GeoPoint,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

const ModalDondeComprar = ({ OpenModalCompra, setOpenModalCompra }) => {
  const [InputValues, setInputValues] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms de retraso
  const [SearchTermSelected, setSearchTermSelected] = useState("");
  const [Loading, setLoading] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState([
    OpenModalCompra?.InfoEditar?.location?.latitude || 4.570868,
    OpenModalCompra?.InfoEditar?.location?.longitude || -74.297333,
  ]);

  const [options, setOptions] = useState([]);

  const { toast } = useToast();

  const fetchLocations = async (query) => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5&countrycodes=CO`
      );

      const data = await response.json();

      if (data.length > 0) {
        // Actualiza las opciones con los resultados de búsqueda
        const formattedOptions = data.map((location) => ({
          value: [parseFloat(location.lat), parseFloat(location.lon)],
          label: location.display_name,
        }));
        setOptions(formattedOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocations(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const closeOpenModalCompra = () => {
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
    try {
      setLoading(true);

      // Verificar si estoy agregando o editando

      if (Object.keys(OpenModalCompra?.InfoEditar).length > 0) {
        //Actualizar lugar de compra en firestore

        await updateDoc(
          doc(db, "DondeComprar", `${OpenModalCompra?.InfoEditar?.id}`),
          {
            ...InputValues,
            location: new GeoPoint(selectedPosition[0], selectedPosition[1]),
            SearchTermSelected: SearchTermSelected,
          }
        );

        toast({
          title: "Lugar de compra actualizado",
          description: "Se actualizó el lugar de compra correctamente",
        });
        closeOpenModalCompra();
        return;
      } else {
        //Agregar nuevo lugar de compra en firestore

        const AddCompra = await addDoc(collection(db, "DondeComprar"), {
          ...InputValues,
          //  add punto geografico
          location: new GeoPoint(selectedPosition[0], selectedPosition[1]),
          searchTerm: searchTerm,
          SearchTermSelected: SearchTermSelected,
        });
        toast({
          title: "Lugar de compra agregado",
          description: "El lugar de compra se actualizo correctamente",
        });
        closeOpenModalCompra();

        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar el lugar de compra",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={OpenModalCompra?.Visible} onOpenChange={closeOpenModalCompra}>
      <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModalCompra?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            un lugar de compra
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="NombreLocal" className="">
                Nombre del Local
                <span className="text-red-600">(*)</span>
              </Label>
              <Input
                id="NombreLocal"
                name="NombreLocal"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalCompra?.InfoEditar?.NombreLocal}
                required
                autoComplete="off"
                autoFocus
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Direccion" className="">
                Dirección
              </Label>
              <Input
                id="Direccion"
                name="Direccion"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalCompra?.InfoEditar?.Direccion}
                required
                autoComplete="off"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Telefono" className="">
                Numero de telefono o celular
              </Label>
              <Input
                id="Telefono"
                name="Telefono"
                className="w-full text-gray-900"
                onChange={HandlerChange}
                defaultValue={OpenModalCompra?.InfoEditar?.Telefono}
                required
                autoComplete="off"
                type="text"
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="Estado" className="">
                Estado
              </Label>
              <Select
                value={InputValues?.Estado}
                defaultValue={OpenModalCompra?.InfoEditar?.Estado}
                onValueChange={(e) => {
                  setInputValues({
                    ...InputValues,
                    Estado: e,
                  });
                }}
                id="Estado"
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
          </div>
          <div>
            <MapComponent
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              debouncedSearchTerm={debouncedSearchTerm}
              InputValues={InputValues}
              options={options}
              setOptions={setOptions}
              fetchLocations={fetchLocations}
              SearchTermSelected={SearchTermSelected}
              setSearchTermSelected={setSearchTermSelected}
            />
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

export default ModalDondeComprar;
