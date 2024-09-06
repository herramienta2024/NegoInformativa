"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/firebase/firebaseClient";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MarcaList from "./MarcaList";

const OrderProductos = () => {
  const [Marcas, setMarcas] = useState([]);
  const [ListMarcas, setListMarcas] = useState([]);
  const [MarcaSelected, setMarcaSelected] = useState("");

  console.log("ListMarcas", ListMarcas);

  useEffect(() => {
    onSnapshot(
      collection(db, `Marcas`),
      // orderBy("email", "asc"),
      (snapshot) =>
        setMarcas(
          snapshot?.docs
            ?.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => a.Order - b.Order)
        )
    );
  }, []);

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      // Actualiza cada categoría en Firebase según su índice en orderedProducts
      if (!ListMarcas) {
        alert("No hay Marcas");
        return;
      }
      if (!MarcaSelected) {
        alert("No hay Marca seleccionada");
        return;
      }

      // Actualiza cada categoría en Firebase según su índice en orderedProducts

      await updateDoc(doc(db, "Marcas", `${MarcaSelected}`), {
        Carrousel: ListMarcas,
      });

      // await Promise.all(
      //   ListMarcas?.map(async (marca, index) => {
      //     const marcaRef = doc(db, "Marcas", marca.id);
      //     await updateDoc(marcaRef, { Order: index + 1 });
      //   })
      // );

      alert("Orden guardado correctamente");

      console.log("Orden guardado correctamente en Firebase!");
    } catch (error) {
      console.error("Error al guardar el orden:", error);
    }
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>
            Ordene y guarde como desea el orden al momento de visualizar los
            productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Disponibilidad" className="text-black">
                Seleccione una opción? <span className="text-red-600">(*)</span>
              </Label>
              <Select
                onValueChange={(e) => {
                  setMarcaSelected(e);
                  const ListCarrousel = Marcas?.find((marca) => marca.id == e);

                  const ListaPoductos =
                    ListCarrousel?.Carrousel?.sort(
                      (a, b) => a.Order - b.Order
                    ) || [];
                  setListMarcas(ListaPoductos);
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Por favor seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  {Marcas?.map((adi, key) => (
                    <SelectItem key={adi.id} value={adi.id}>
                      {adi.NombreMarca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <MarcaList
                ListMarcas={ListMarcas}
                setListMarcas={setListMarcas}
              />

              <Button onClick={handleClick}>Guardar Orden</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderProductos;