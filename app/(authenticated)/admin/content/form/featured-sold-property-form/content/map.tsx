import React from "react";
import { Input } from "../components";

const Map = ({
  formData,
  handleChange,
  errors,
}: {
  formData: any;
  handleChange: any;
  errors: any;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <Input
        type="number"
        label="Latitude:"
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
        error={errors?.latitude}
      />

      <Input
        type="number"
        label="Longitude:"
        name="longitude"
        value={formData.longitude}
        onChange={handleChange}
        error={errors?.longitude}
      />
    </div>
  );
};

export default Map;
