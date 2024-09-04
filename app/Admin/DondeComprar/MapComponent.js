"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Importar Leaflet para iconos personalizados
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Asegúrate de que esta ruta es correcta
import { Input } from "@/components/ui/input";

// SVG del StoreIcon
const storeIconSVG = `
<svg data-v-14c8c335="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store lucide-icon customizable"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path></svg>
`;

const MapComponent = ({
  selectedPosition,
  setSelectedPosition,
  setSearchTerm,
  InputValues,
  options,
  searchTerm,
  SearchTermSelected,
  setSearchTermSelected,
}) => {
  const handleSelectChange = (event) => {
    const selectedValue = options.find((option) => option.label === event);

    if (selectedValue) {
      setSearchTermSelected(selectedValue.label);
      setSelectedPosition(selectedValue.value);
    }
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (selectedPosition) {
        map.setView(selectedPosition, map.getZoom()); // Actualiza la vista del mapa
      }
    }, [selectedPosition, map]);
    return null;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
      },
    });
    return null;
  };

  // Define un icono SVG personalizado
  const customIcon = new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(storeIconSVG)}`, // Convierte el SVG a una URL de datos
    iconSize: [32, 32], // Tamaño del icono
    iconAnchor: [16, 32], // Ancla del icono (dónde se fija al mapa)
    popupAnchor: [0, -32], // Ancla del popup en relación al icono
  });

  return (
    <div className="space-y-4">
      <Input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ingrese ciudad o dirección"
      />
      {options.length > 0 && (
        <Select onValueChange={handleSelectChange} className="w-[300px]">
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una ubicación" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.label} value={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {SearchTermSelected && (
        <MapContainer
          center={selectedPosition || [4.570868, -74.297333]} // Valor por defecto si selectedPosition no está definido
          zoom={10}
          style={{ height: "300px", width: "100%" }}
          className="mt-64"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedPosition && (
            <Marker position={selectedPosition} icon={customIcon}>
              <Popup>
                Local:{" "}
                <strong>
                  {InputValues?.NombreLocal || "Nombre no disponible"}
                </strong>
              </Popup>
            </Marker>
          )}

          <MapUpdater />
          <MapClickHandler />
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
