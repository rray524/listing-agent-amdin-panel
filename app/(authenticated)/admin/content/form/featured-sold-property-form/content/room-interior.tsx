import React from "react";
import FormSelect, { Input } from "../components";
import { PropertyEntity } from "../types";

const RoomInterior = ({
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
        type="number"
        label="Rooms:"
        name="rooms"
        value={formData.room_interior.rooms}
        onChange={(e) => handleNestedChange(e, "room_interior")}
        error={errors.room_interior_Rooms}
      />

      <Input
        type="number"
        label="Rooms plus:"
        name="rooms_plus"
        value={formData.room_interior.rooms_plus}
        onChange={(e) => handleNestedChange(e, "room_interior")}
        error={errors.room_interior_Rooms_plus}
      />

      <Input
        type="number"
        label="Bedrooms:"
        name="bedrooms"
        value={formData.room_interior.bedrooms}
        onChange={(e) => handleNestedChange(e, "room_interior")}
        error={errors.room_interior_bedrooms}
      />

      <Input
        type="number"
        label="Bedrooms plus:"
        name="bedrooms_plus"
        value={formData.room_interior.bedrooms_plus}
        onChange={(e) => handleNestedChange(e, "room_interior")}
        error={errors.room_interior_bedrooms_plus}
      />

      <Input
        type="number"
        label="Kitchens:"
        name="kitchens"
        value={formData.room_interior.kitchens}
        onChange={(e) => handleNestedChange(e, "room_interior")}
        error={errors.room_interior_kitchens}
      />

      <div>
        <label className="block font-semibold dark:text-gray-900">
          Family Room:
        </label>
        <FormSelect
          name="family_room"
          value={formData.room_interior.family_room}
          onChange={(e) => handleNestedChange(e, "room_interior")}
          options={[
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" },
          ]}
        />

        {errors.room_interior_family_room && (
          <p className="text-red-500">{errors.room_interior_family_room}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold dark:text-gray-900">
          Basement:
        </label>
        <FormSelect
          name="basement"
          value={formData.room_interior.basement}
          onChange={(e) => handleNestedChange(e, "room_interior")}
          options={[
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" },
          ]}
        />

        {errors.room_interior_basement && (
          <p className="text-red-500">{errors.room_interior_basement}</p>
        )}
      </div>
    </div>
  );
};

export default RoomInterior;
