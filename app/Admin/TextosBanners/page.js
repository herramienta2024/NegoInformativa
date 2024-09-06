"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/firebase/firebaseClient";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const TextosMarcas = () => {
  const [Marcas, setMarcas] = useState([]);
  const [OptionSelecteds, setOptionSelecteds] = useState("");
  const [ImagenSelected, setImagenSelected] = useState(null);
  const [InputValues, setInputValues] = useState({});

  const { toast } = useToast();

  const handlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };

  console.log(OptionSelecteds);
  console.log(ImagenSelected);

  useEffect(() => {
    const BannerQuery = collection(db, "Marcas");

    const unsubscribe = onSnapshot(BannerQuery, (snapshot) => {
      setMarcas(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  // falta treaer los textos de la marca si tiene

  return (
    <div className="space-y-4">
      <Card className="space-y-2">
        <CardContent className="space-y-4">
          <div>
            <label>Seleccione La marca</label>

            <Select
              onValueChange={(e) => {
                setOptionSelecteds(e);
                setImagenSelected(null);
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Seleccione una marca" />
              </SelectTrigger>
              <SelectContent>
                {Marcas.map((marca, key) => (
                  <SelectItem value={marca} key={marca.id}>
                    {marca?.NombreMarca}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="">
            {OptionSelecteds?.Carrousel?.length ? (
              <div className="space-y-3">
                <label>Seleccione Imagen</label>

                <Select
                  onValueChange={(e) => {
                    setImagenSelected(e);
                  }}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Seleccione imagen del producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {OptionSelecteds?.Carrousel?.map((img, key) => (
                      <div key={key}>
                        <SelectItem value={key} key={key}>
                          <div className="flex items-center space-x-4">
                            <Image
                              alt={key}
                              src={img?.Imagen ? img?.Imagen : img}
                              height={80}
                              width={100}
                            />
                            <p>Imagen {key + 1}</p>
                          </div>
                        </SelectItem>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              "Esta marca no tiene carrousel"
            )}
          </div>
        </CardContent>
      </Card>
      {(ImagenSelected || ImagenSelected == 0) &&
        OptionSelecteds?.Carrousel.length > 0 && (
          <Card>
            <CardContent>
              <h1>Carrousel - {OptionSelecteds?.NombreMarca}</h1>
              <form
                onSubmit={async (e) => {
                  try {
                    e.preventDefault();

                    if (!InputValues.Titulo || !InputValues.Description) {
                      return toast({
                        title: "Error",
                        description: "Todos los campos son requeridos",
                      });
                    }

                    let newCarrousel = OptionSelecteds?.Carrousel;

                    newCarrousel[ImagenSelected] = {
                      Titulo: InputValues.Titulo,
                      Description: InputValues.Description,
                      Imagen: OptionSelecteds?.Carrousel[ImagenSelected],
                    };

                    const BannerRef = doc(
                      db,
                      "Marcas",
                      `${OptionSelecteds.id}`
                    );

                    await updateDoc(BannerRef, {
                      Carrousel: newCarrousel,
                    });

                    toast({
                      title: "Guardado",
                      description: "Se ha guardado correctamente",
                    });

                    setInputValues({});
                    setImagenSelected(null);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="flex flex-wrap gap-x-4"
              >
                <div className="">
                  <Image
                    src={
                      OptionSelecteds?.Carrousel[ImagenSelected]?.Imagen
                        ? OptionSelecteds?.Carrousel[ImagenSelected]?.Imagen
                        : OptionSelecteds?.Carrousel[ImagenSelected]
                    }
                    width={450}
                    height={450}
                    alt={ImagenSelected}
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="Titulo">Titulo</Label>
                  <Input
                    type="text"
                    name="Titulo"
                    id="Titulo"
                    required
                    onChange={handlerChange}
                    defaultValue={
                      OptionSelecteds?.Carrousel[ImagenSelected]?.Titulo || ""
                    }
                  />
                  <label htmlFor="Description">Descripción</label>
                  <Textarea
                    id="Description"
                    placeholder="Escriba Aqui"
                    rows={3}
                    required
                    onChange={handlerChange}
                    name="Description"
                    defaultValue={
                      OptionSelecteds?.Carrousel[ImagenSelected]?.Description ||
                      ""
                    }
                  />

                  <div className="space-x-4">
                    <Button type="submit" className=" mt-4">
                      Guardar
                    </Button>

                    <Button
                      onClick={async (e) => {
                        e.preventDefault();

                        if (confirm("Estas seguro de eliminar la imagen")) {
                          let newCarrousel = OptionSelecteds?.Carrousel;

                          newCarrousel.splice(ImagenSelected, 1);

                          const BannerRef = doc(
                            db,
                            "Marcas",
                            `${OptionSelecteds.id}`
                          );

                          console.log(newCarrousel, "newCarrousel");

                          await updateDoc(BannerRef, {
                            Carrousel: newCarrousel,
                          });

                          e.target.reset();
                          setInputValues({});
                          setImagenSelected(null);

                          toast({
                            title: "Eliminado",
                            description: "Se ha eliminado correctamente",
                          });
                        }
                      }}
                      type="button"
                      className="bg-red-700 mt-4"
                    >
                      Eliminar imagen
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default TextosMarcas;
