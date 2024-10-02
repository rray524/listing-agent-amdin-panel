import React from "react";
import { useGoogleMapsApiKey } from "@/contexts/api-context";

interface PropertyDetails {
  latitude: string;
  longitude: string;
}
const StreetMap: React.FC<{ details: PropertyDetails }> = ({ details }) => {
  const apiKey = useGoogleMapsApiKey();

  return (
    <div className="embed-map-container">
      <iframe
        width="100%"
        height="520"
        src={`https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${details.latitude},${details.longitude}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default StreetMap;
