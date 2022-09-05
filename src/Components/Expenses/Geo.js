import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function Geo() {
  return (
    <div className="h-28 mt-10 w-56 rounded-lg bg-sefid overflow-hidden">
      <MapContainer center={[35.5501, 51.515]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
