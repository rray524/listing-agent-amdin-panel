import React from "react";
import { PropertyEntity } from "../types";
import FormSelect, { Input } from "../components";

const Utilities = ({
  formData,
  handleNestedChange,
  errors,
}: {
  formData: PropertyEntity;
  handleNestedChange: any;
  errors: any;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <div>
        <label className="block font-semibold dark:text-gray-900">
          Fireplace/Stove:
        </label>
        <FormSelect
          name="fireplace_stove"
          value={formData.utilities.fireplace_stove}
          onChange={(e) => handleNestedChange(e, "utilities")}
          options={[
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" },
          ]}
        />

        {errors.utilities_fireplace_stove && (
          <p className="text-red-500">{errors.utilities_fireplace_stove}</p>
        )}
      </div>

      <Input
        label="Heat Source:"
        name="heat_source"
        value={formData.utilities.heat_source}
        onChange={(e) => handleNestedChange(e, "utilities")}
        error={errors.utilities_heat_source}
      />

      <Input
        label="Heat Type:"
        name="heat_type"
        value={formData.utilities.heat_type}
        onChange={(e) => handleNestedChange(e, "utilities")}
        error={errors.utilities_heat_type}
      />

      <Input
        label="Central Air Conditioning:"
        name="central_air_conditioning"
        value={formData.utilities.central_air_conditioning}
        onChange={(e) => handleNestedChange(e, "utilities")}
        error={errors.utilities_central_air_conditioning}
      />

      <Input
        label="Laundry Level:"
        name="laundry_level"
        value={formData.utilities.laundry_level}
        onChange={(e) => handleNestedChange(e, "utilities")}
        error={errors.utilities_laundry_level}
      />

      <Input
        label="Sewers:"
        name="sewers"
        value={formData.utilities.sewers}
        onChange={(e) => handleNestedChange(e, "utilities")}
        error={errors.utilities_sewers}
      />

      <Input
        label="Water:"
        name="water"
        value={formData.utilities.water}
        onChange={(e) => handleNestedChange(e, "utilities")}
        error={errors.utilities_water}
      />
    </div>
  );
};

export default Utilities;
