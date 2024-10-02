import React from "react";
import FormSelect, { Input } from "../components";

const AtGlance = ({
  formData,
  handleNestedChange,
  errors,
}: {
  formData: any;
  handleNestedChange: any;
  errors: any;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <Input
        label="Type:"
        name="type"
        value={formData.at_a_glance.type}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_type}
      />
      <Input
        label="Area:"
        name="area"
        value={formData.at_a_glance.area}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_area}
      />
      <Input
        label="Municipality:"
        name="municipality"
        value={formData.at_a_glance.municipality}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_municipality}
      />
      <Input
        label="Neighbourhood:"
        name="neighborhood"
        value={formData.at_a_glance.neighborhood}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_neighborhood}
      />
      <Input
        label="Style:"
        name="style"
        value={formData.at_a_glance.style}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_style}
      />
      <Input
        label="Beds:"
        type="number"
        name="beds"
        value={formData.at_a_glance.beds}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_beds}
      />
      <Input
        label="Baths:"
        type="number"
        name="baths"
        value={formData.at_a_glance.baths}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_baths}
      />
      <Input
        type="number"
        label="Lot Size:"
        name="lot_size"
        value={formData.at_a_glance.lot_size}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_lot_size}
      />
      <Input
        label="Tax:"
        type="number"
        name="tax"
        value={formData.at_a_glance.tax}
        onChange={(e) => handleNestedChange(e, "at_a_glance")}
        error={errors.at_a_glance_tax}
        prefix="$"
      />

      <div>
        <label className="block font-semibold dark:text-gray-900">
          Fireplace:
        </label>
        <FormSelect
          name="fireplace"
          value={formData.at_a_glance.fireplace}
          onChange={(e) => handleNestedChange(e, "at_a_glance")}
          options={[
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" },
          ]}
        />

        {errors.at_a_glance_fireplace && (
          <p className="text-red-500">{errors.at_a_glance_fireplace}</p>
        )}
      </div>
      <div>
        <label className="block font-semibold dark:text-gray-900">Pool:</label>
        <FormSelect
          name="pool"
          value={formData.at_a_glance.pool}
          onChange={(e) => handleNestedChange(e, "at_a_glance")}
          options={[
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" },
            { value: "E", label: "Either" },
            { value: "C", label: "Community" },
          ]}
        />

        {errors.at_a_glance_pool && (
          <p className="text-red-500">{errors.at_a_glance_pool}</p>
        )}
      </div>
    </div>
  );
};

export default AtGlance;
