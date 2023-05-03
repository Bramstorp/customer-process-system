import React, { FunctionComponent, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const initialLocations = [
  { position: [56.162939, 10.203921], name: "Aarhus", count: 10 },
  { position: [55.676098, 12.568337], name: "Copenhagen", count: 5 },
  { position: [55.403756, 10.40237], name: "Odense", count: 2 },
];

export const Locations: FunctionComponent = () => {
  const [locations, setLocations] = useState(initialLocations);

  return (
    <>
      <h1 className="text-5xl mb-12">locations</h1>
      <MapContainer center={[56.162939, 10.203921]} zoom={7} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map(({ position, name, count }, index) => (
          <CircleMarker
            key={index}
            center={position}
            radius={count * 2}
            fillColor="red"
            color="red"
            weight={1}
            opacity={0.5}
          >
            <Popup>
              <p>
                {name}: {count}
              </p>
            </Popup>
            <div className="marker-label">{count}</div>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
};
