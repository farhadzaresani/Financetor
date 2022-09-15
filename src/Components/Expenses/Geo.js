import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import locTag from "../../Assets/Images/location.png";
import { Location } from "iconsax-react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Geo({ mapRef }) {
  return (
    <div className=" mt-8 flex items-center justify-center  relative rounded-lg bg-sefid ">
      <MapContainer
        className="z-10"
        ref={mapRef}
        style={{ height: "25em", width: "20em", maxWitdh: "100%" }}
        center={[35.5501, 51.515]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <Location
        className="absolute mb-10  z-20 "
        size="32"
        color="red"
        variant="Bold"
      />
    </div>
  );
}
