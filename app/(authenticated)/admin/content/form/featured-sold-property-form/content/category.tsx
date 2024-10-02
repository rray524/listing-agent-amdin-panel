"use client";
import React, { useEffect } from "react";
import FormSelect, { Input } from "../components";
import { PropertyEntity } from "../types";
import Image from "next/image";

type onChange = (e: React.ChangeEvent<any>) => void;

const Category = ({
  category,
  formData,
  handleChange,
  errors,
  handleDeleteImage,
  handleFileChange,
}: {
  category: string;
  formData: PropertyEntity;
  errors: any;
  handleDeleteImage: (v: number) => void;
  handleChange: onChange;
  handleFileChange: onChange;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 w-full">
        {category === "pre-constructed" && (
          <Input
            label="Name:"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        )}

        <div>
          <label className="block font-semibold dark:text-gray-900">
            Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded w-full"
          >
            {category !== "pre-constructed" ? (
              <>
                <option value="">Select Category</option>
                <option value="new">New</option>
                <option value="sold">Sold</option>
              </>
            ) : (
              <>
                <option value="">Select Category</option>
                <option value="pre-constructed">Pre constructed</option>
              </>
            )}
          </select>
          {errors.category && <p className="text-red-500">{errors.category}</p>}
        </div>

        <div>
          <label className="block font-semibold dark:text-gray-900">
            Available For:
          </label>
          <FormSelect
            name="available_for"
            value={formData.available_for}
            onChange={handleChange}
            options={[
              { value: "sale", label: "Sale" },
              { value: "lease", label: "Lease" },
            ]}
          />

          {errors.available_for && (
            <p className="text-red-500">{errors.available_for}</p>
          )}
        </div>

        <Input
          label="Listing ID:"
          name="listing_id"
          value={formData.listing_id}
          onChange={handleChange}
          disabled={true}
          error={errors.listing_id}
        />

        <div>
          <label className="block font-semibold dark:text-gray-900">
            Property Description:
          </label>
          <textarea
            name="property_description"
            value={formData.property_description}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded w-full"
          ></textarea>
          {errors.property_description && (
            <p className="text-red-500">{errors.property_description}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold dark:text-gray-900">
            Property Images:
          </label>
          <input
            type="file"
            name="property_images"
            multiple
            onChange={handleFileChange}
            className="p-3 border border-gray-300 rounded w-full"
          />
          {errors.property_images && (
            <p className="text-red-500">{errors.property_images}</p>
          )}
          {formData.property_images.length > 0 && (
            <div className="mt-2">
              <p>Uploaded Images:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {formData.property_images.map(
                  (image: { url: string | undefined }, index: number) => (
                    <div key={index} className="relative">
                      <Image
                        src={`${image.url}`}
                        alt={`Property Image ${index + 1}`}
                        className="w-full sm:w-[200px] sm:h-[100px] object-cover rounded"
                        height={100}
                        width={200}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                      >
                        &times;
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
