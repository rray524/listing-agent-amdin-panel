"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { PropertyEntity, initialState } from "./types";
import Category from "./content/category";
import GeneralDetails from "./content/general-details";
import RoomInterior from "./content/room-interior";
import Exterior from "./content/exterior";
import Utilities from "./content/utilities";
import AtGlance from "./content/at-a-glance";
import Map from "./content/map";
import { TabButton } from "./components";
import { hasTabErrors, tabs, validateForm } from "./utils";
import { useForm, FormProvider } from "react-hook-form";
import { updateProperty, createProperty, getProperty } from "./actions";
import { generateRandomId } from "./utils/utils";
import { useToast } from "@/contexts/toast-context";
import { ToastContainer } from "react-toastify";

interface PropertyFormProps {
  category: string;
  propertyId: string | null;
  onClose?: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  propertyId,
  onClose,
  category,
}) => {
  const methods = useForm({
    defaultValues: initialState,
  });
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const [formData, setFormData] = useState<PropertyEntity>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<string>("category");
  const scrollableContainerRef = React.useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: keyof PropertyEntity
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]: {
        ...(prevFormData[category] as Record<string, any>),
        [name]: value,
      },
    }));
  };
  useEffect(() => {
    const generatedListingId = generateRandomId();
    setValue("listing_id", generatedListingId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      listing_id: generatedListingId,
    }));
  }, [setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const maxSize = 2 * 1024 * 1024;
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    let newFiles: { file: File | null; url: string }[] = [];

    if (files) {
      newFiles = Array.from(files)
        .map((file) => {
          if (!allowedFormats.includes(file.type)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              property_images: `Only PNG, JPG, JPEG formats are allowed.`,
            }));
            return null;
          }
          if (file.size > maxSize) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              property_images: `File size should not exceed 2 MB.`,
            }));
            return null;
          }
          return {
            file,
            url: URL.createObjectURL(file),
            filename: file.name,
          };
        })
        .filter(
          (file): file is { file: File; url: string; filename: string } =>
            file !== null
        );
    }

    setFormData((prevFormData) => {
      const uniqueFiles = newFiles.filter(
        (newFile) =>
          !prevFormData.property_images.some(
            (existingFile) => existingFile.url === newFile.url
          )
      );

      return {
        ...prevFormData,
        property_images: [...prevFormData.property_images, ...uniqueFiles],
      };
    });
  };

  const handleDeleteImage = async (index: number) => {
    setFormData((prevFormData) => {
      const updatedImages = prevFormData.property_images.filter(
        (_, i) => i !== index
      );
      const removedImage = prevFormData.property_images[index];
      const filename = removedImage.filename;
      if (!filename) return prevFormData;

      const updatedImageUrls = prevFormData.image_urls.filter(
        (url) => url !== filename
      );
      return {
        ...prevFormData,
        property_images: updatedImages,
        image_urls: updatedImageUrls,
        remove_image_urls: [
          ...(prevFormData.remove_image_urls || []),
          filename,
        ],
      };
    });
  };

  const appendNestedObject = (
    formData: PropertyEntity,
    formDataToSend: globalThis.FormData
  ) => {
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof PropertyEntity];
      if (
        typeof value === "object" &&
        !(value instanceof File) &&
        !Array.isArray(value)
      ) {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (
        ![
          "property_images",
          "image_urls",
          "street_view",
          "map_location",
          "is_deleted",
          "place_id",
          "_id",
          "agent_id",
          "__v",
          "created_at",
          "updated_at",
          "remove_image_urls",
        ].includes(key)
      ) {
        if (key === "name" && formData.category === "pre-constructed") {
          if (!value) {
            throw new Error("Name is required for pre-constructed properties");
          }
          formDataToSend.append(key, value as unknown as string | Blob);
        } else if (key !== "name") {
          formDataToSend.append(key, value as unknown as string | Blob);
        }
      }
    });
  };
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
    setFormData(initialState);
  };

  const onSubmit = async (formData: PropertyEntity) => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const files = formData.property_images
        .map((image) => image.file)
        .filter((file): file is File => file !== null);

      const data = new FormData();

      files.forEach((file) => {
        data.append("images", file);
      });

      appendNestedObject(formData, data);

      const allImageUrls = formData.image_urls;
      allImageUrls.forEach((url) => {
        data.append("image_urls[]", url);
      });

      if (propertyId && formData.remove_image_urls) {
        formData.remove_image_urls.forEach((url) => {
          data.append("remove_image_urls[]", url);
        });
      }

      let response;
      if (propertyId) {
        response = await updateProperty(propertyId, data);
        showToast("Property updated successfully!", "success");
      } else {
        response = await createProperty(data);
        showToast("Property created successfully!", "success");
      }

      setError(null);
      setErrors({});
      setFormData(initialState);
      if (onClose) {
        onClose();
      }
      router.push("/admin");
    } catch (err) {
      console.error(err);
      showToast("Error saving property. Please try again.", "error");
      setError("Error saving property. Please try again.");
    }
  };

  useEffect(() => {
    if (propertyId) {
      const fetchPropertyData = async () => {
        try {
          const response = await getProperty(propertyId);

          const propertyData = response.data as PropertyEntity;

          const formattedPropertyData = {
            ...propertyData,
            property_images: propertyData.image_urls.map((img: any) => ({
              file: null,
              url: `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/images/${img}`,
              filename: img,
            })),
          };

          setFormData(formattedPropertyData);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch property data.");
        }
      };

      fetchPropertyData();
    }
  }, [propertyId]);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const tabContent = () => {
    switch (activeTab) {
      case "category":
        return (
          <Category
            category={category}
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            handleDeleteImage={handleDeleteImage}
            handleFileChange={handleFileChange}
          />
        );
      case "general_details":
        return (
          <GeneralDetails
            errors={errors}
            formData={formData}
            handleNestedChange={handleNestedChange}
            handleChange={handleChange}
          />
        );
      case "room_interior":
        return (
          <RoomInterior
            errors={errors}
            formData={formData}
            handleNestedChange={handleNestedChange}
          />
        );
      case "exterior":
        return (
          <Exterior
            errors={errors}
            formData={formData}
            handleNestedChange={handleNestedChange}
          />
        );
      case "utilities":
        return (
          <Utilities
            errors={errors}
            formData={formData}
            handleNestedChange={handleNestedChange}
          />
        );
      case "at_a_glance":
        return (
          <AtGlance
            errors={errors}
            formData={formData}
            handleNestedChange={handleNestedChange}
          />
        );
      case "map":
        return (
          <Map
            errors={errors}
            formData={formData}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="max-w-7xl p-8 w-full mx-auto max-lg:w-[100%] bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          {propertyId ? "Edit Property" : "Create Property"}
        </h2>

        <div className="mb-6">
          <div className="flex space-x-4 flex-col md:flex-row gap-4">
            {tabs.map((tab) => (
              <TabButton
                key={tab.field}
                hasError={hasTabErrors(errors, tab.field)}
                isActive={activeTab === tab.field}
                label={tab.label}
                onClick={() => setActiveTab(tab.field)}
              />
            ))}
          </div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div
              ref={scrollableContainerRef}
              className="max-h-[500px] overflow-y-auto scrollable-container px-3"
            >
              {tabContent()}
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white px-5 py-3 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : propertyId
                  ? "Edit Property"
                  : "Create Property"}
              </button>
              {onClose && propertyId && (
                <button
                  type="button"
                  className="mt-4 bg-gray-700 text-white px-5 py-3 rounded hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
      <ToastContainer />
    </>
  );
};

export default PropertyForm;
