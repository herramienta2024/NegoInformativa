import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/firebaseClient";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Phone, ShoppingBagIcon } from "lucide-react";

const storeIconSVG = `
  
  <svg data-v-14c8c335="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ea4335" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin lucide-icon customizable"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
  `;

const ModalUbicacion = ({ OpenModalSearch, setOpenModalSearch }) => {
  const [Compras, setCompras] = useState([]);
  const [SearchsElement, setSearchsElement] = useState([]);

  const closeOpenModalProducto = () => {
    setOpenModalSearch(false);
  };

  useEffect(() => {
    // Crea la consulta para filtrar por Estado = "Activo"
    const q = query(
      collection(db, "DondeComprar"),
      where("Estado", "==", "Activo")
    );

    // Escucha los cambios en los documentos que cumplen con la consulta
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const DondeComprarData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompras(DondeComprarData);
        setSearchsElement(DondeComprarData);
      },
      (error) => {
        console.error("Error fetching compras: ", error);
      }
    );

    // Función de limpieza para cancelar la suscripción
    return () => unsubscribe();
  }, []);

  const customIcon = new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(storeIconSVG)}`, // Convierte el SVG a una URL de datos
    iconSize: [32, 32], // Tamaño del icono
    iconAnchor: [16, 32], // Ancla del icono (dónde se fija al mapa)
    popupAnchor: [0, -32], // Ancla del popup en relación al icono
  });

  return (
    <>
      <Dialog open={OpenModalSearch} onOpenChange={closeOpenModalProducto}>
        <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh]   overflow-auto  sm:max-w-6xl">
          <DialogHeader className="w-full h-full">
            <DialogTitle className="uppercase">Donde Comprar</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="space-y-3">
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchsElement(
                    Compras.filter((compra) =>
                      compra?.SearchTermSelected.toLowerCase().includes(
                        value.toLowerCase()
                      )
                    )
                  );
                }}
                placeholder="Ciudad"
              />

              <div className="flex flex-col w-full lg:h-full h-40 max-h-[400px] overflow-y-auto">
                {SearchsElement.map((compra) => (
                  <div key={compra?.id} className="flex items-center gap-3 ">
                    <div className="flex h-[4rem] w-[4rem] items-center justify-center ">
                      <ShoppingBagIcon className="h-full w-full rounded-xl" />
                    </div>
                    <div className="flex flex-col w-full h-full tracking-tight leading-3 space-y-0">
                      <h5 className="text-base font-bold text-navy-700 ">
                        {compra?.NombreLocal || ""}{" "}
                      </h5>
                      <p className=" text-sm font-normal text-gray-600">
                        {compra?.Direccion || ""}
                      </p>

                      {compra?.Telefono && (
                        <p className=" text-sm font-normal flex text-gray-600 gap-x-1 ">
                          <Phone className="w-4 h-4 " />
                          <span>{compra?.Telefono}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-full">
              <MapContainer
                center={[4.570868, -74.297333]} // Valor por defecto si selectedPosition no está definido
                zoom={6}
                // style={{ height: "400px", width: "100%" }}
                className=" w-full max-h-[400px] h-[200px] lg:h-[400px]"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* {selectedPosition && (
                    <Marker position={selectedPosition} icon={customIcon}>
                      <Popup>
                        Local:{" "}
                        <strong>
                          {InputValues?.NombreLocal || "Nombre no disponible"}
                        </strong>
                      </Popup>
                    </Marker>
                  )} */}
                {SearchsElement.map((compra) => {
                  return (
                    <Marker
                      key={compra.id}
                      position={[
                        compra?.location?.latitude,
                        compra.location?.longitude,
                      ]}
                      icon={customIcon}
                    >
                      <Popup>
                        Local: <strong>{compra.NombreLocal}</strong>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalUbicacion;
