import React, { useMemo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const defaultCenter = {
  lat: -33.4489,
  lng: -70.6693
};

const CarMap = () => {
  const center = useMemo(() => defaultCenter, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCyv-Xg1qp09ZZITC3b6fsx4bWW2vxQpNU">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default CarMap;

