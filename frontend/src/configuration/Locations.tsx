import axios from "axios";
import React, { FunctionComponent, useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

interface Location {
  address: string;
  count: number;
  lat: number;
  long: number;
}

export const Locations: FunctionComponent = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios.get<Location[]>("http://localhost:8000/customers-locations").then((res) => {
      setLocations(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="text-5xl mb-12">locations</h1>
      {!loading ? (
        <MapContainer center={[56.162939, 10.203921]} zoom={7} style={{ height: "500px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.lat, location.long]}
              radius={location.count * 10}
              fillColor="red"
              color="red"
              weight={1}
              opacity={0.5}
            >
              <Popup>
                <p>
                  {location.address}: {location.count}
                </p>
              </Popup>
              <div className="marker-label">{location.count}</div>
            </CircleMarker>
          ))}
        </MapContainer>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
