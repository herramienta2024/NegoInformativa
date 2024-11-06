"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a
import { Carousel } from "react-responsive-carousel";
import ImagenZoom from "./ImagenZoom";
import { Badge } from "@/components/ui/badge";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseClient";

const ModalShowProducto = ({
  product,
  ShowModalProductos,
  setShowModalProductos,
}) => {
  const [CategoriaState, setCategoriaState] = useState({});
  let NewArray = product?.ImagenesGenerales || [];

  useEffect(() => {
    // get Categoria del product.Categoria en la correcion de categorias en codigo front-end

    const GetCategoria = async (product) => {
      const Categoria = await getDoc(doc(db, "Categorias", product?.Categoria));

      setCategoriaState(Categoria.data());
    };
    GetCategoria(product);
  }, [product]);

  return (
    <Dialog
      open={ShowModalProductos?.Visible}
      onOpenChange={(open) => {
        setShowModalProductos({ Visible: open, Producto: {} });

        return;
      }}
    >
      <DialogContent className="max-w-7xl h-auto  ">
        <DialogHeader>
          <DialogTitle>Información del producto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-gray-400 text-sm"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col lg:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div>
                  <div className="   rounded-lg bg-gray-100  ">
                    <Carousel
                      infiniteLoop
                      autoPlay
                      showThumbs={false}
                      showStatus={false}
                    >
                      {NewArray.map((img, index) => (
                        <div key={index} className="   ">
                          <ImagenZoom
                            src={img}
                            Info={product}
                            CategoriaState={CategoriaState}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4 space-y-3">
                <h1 className="text-Secundario text-5xl">
                  {product?.NombreProducto || ""}
                </h1>
                {/* <p className="text-indigo-600 text-sm">
                      {Info?.DescripcionCategoria || "hola"}
                    </p> */}

                <div className=" space-x-2 ">
                  <Badge variant="outline">
                    Código: {product?.ITEM || "ITEM"}
                  </Badge>
                  <Badge variant="outline">
                    Cantidad: {product?.PCSCaja || "PCS-Caja"}
                  </Badge>
                </div>

                <div
                  className="text-gray-500 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: `${product?.Description || ""}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalShowProducto;
