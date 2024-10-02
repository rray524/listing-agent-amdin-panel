import React from "react";
import { Input, Input2 } from "../components";
import { PropertyEntity } from "../types";

const GeneralDetails = ({
  formData,
  handleNestedChange,
  errors,
  handleChange,
}: {
  formData: PropertyEntity;
  handleNestedChange: any;
  handleChange: any;
  errors: any;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <Input
        type="number"
        label="Price:"
        name="price"
        value={formData.general_details.price}
        onChange={(e: any) => handleNestedChange(e, "general_details")}
        error={errors.general_details_price}
        prefix="$"
      />

      <Input
        label="Taxes:"
        type="number"
        name="taxes"
        value={formData.general_details.taxes}
        onChange={(e: any) => handleNestedChange(e, "general_details")}
        error={errors.general_details_taxes}
        prefix="$"
      />

      <Input
        label="Address:"
        name="address"
        value={formData.general_details.address}
        onChange={(e: any) => handleNestedChange(e, "general_details")}
        error={errors.general_details_address}
      />

      <Input
        label="Directions/Cross Streets:"
        name="directions"
        value={formData.general_details.directions}
        onChange={(e: any) => handleNestedChange(e, "general_details")}
        error={errors.general_details_directions}
      />

      <Input
        label="City:"
        name="city"
        type="text"
        value={formData.city}
        onChange={handleChange}
        error={errors?.city}
      />

      <Input
        label="State:"
        name="state"
        type="text"
        value={formData.state}
        onChange={handleChange}
        error={errors?.state}
      />

      <Input
        label="Country:"
        name="country"
        type="text"
        value={formData.country}
        onChange={handleChange}
        error={errors?.country}
      />

      <Input
        label="Pincode:"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        error={errors?.pincode}
      />
      <Input
        label="Lot Size:"
        type="number"
        name="lot_size"
        value={formData.general_details.lot_size}
        onChange={(e: any) => handleNestedChange(e, "general_details")}
        error={errors.general_details_lot_size}
      />
      <Input
        label="Square Feet:"
        type="number"
        name="square_feet"
        value={formData.square_feet}
        onChange={handleChange}
        error={errors?.square_feet}
      />
    </div>
  );
};

export default GeneralDetails;
