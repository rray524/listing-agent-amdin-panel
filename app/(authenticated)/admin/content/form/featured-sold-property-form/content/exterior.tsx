import FormSelect, { Input } from "../components";
import { PropertyEntity } from "../types";

const Exterior = ({
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
      <Input
        label="Property Type:"
        name="property_type"
        value={formData.exterior.property_type}
        onChange={(e) => handleNestedChange(e, "exterior")}
        error={errors.exterior_property_type}
      />

      <Input
        label="Style:"
        name="style"
        value={formData.exterior.style}
        onChange={(e) => handleNestedChange(e, "exterior")}
        error={errors.exterior_style}
      />

      <Input
        label="Exterior:"
        name="exterior"
        value={formData.exterior.exterior}
        onChange={(e) => handleNestedChange(e, "exterior")}
        error={errors.exterior_exterior}
      />

      <Input
        label="Garage Type:"
        name="garage_type"
        value={formData.exterior.garage_type}
        onChange={(e) => handleNestedChange(e, "exterior")}
        error={errors.exterior_garage_type}
      />

      <Input
        label="Drive Parking Spaces:"
        type="number"
        name="drive_parking_spaces"
        value={formData.exterior.drive_parking_spaces}
        onChange={(e) => handleNestedChange(e, "exterior")}
        error={errors.exterior_drive_parking_spaces}
      />

      <div>
        <label className="block font-semibold dark:text-gray-900">Pool:</label>
        <FormSelect
          name="pool"
          value={formData.exterior.pool}
          onChange={(e) => handleNestedChange(e, "exterior")}
          options={[
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" },
            { value: "E", label: "Either" },
            { value: "C", label: "Community" },
          ]}
        />

        {errors.exterior_pool && (
          <p className="text-red-500">{errors.exterior_pool}</p>
        )}
      </div>
    </div>
  );
};

export default Exterior;
