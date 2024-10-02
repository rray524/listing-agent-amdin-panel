import { formatPrice } from "@/app/(authenticated)/admin/[id]/tabs/utils";
import { PropertyEntity } from "@/app/(authenticated)/admin/content/form/featured-sold-property-form/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Feature } from "./feature-card-component";
import { BathroomIcon, BedroomIcon, ViewIcon } from "./icon-components";

interface PropertyCardProps {
  details: PropertyEntity;
  index: number;
  onEdit?: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
  isAdmin: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  details,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const handleEdit = () => {
    if (onEdit) onEdit(details._id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(details._id);
  };
  return (
    <div className="block rounded-lg p-4 dark:shadow-none shadow-sm shadow-indigo-100 bg-[#fff8f8] dark:bg-gray-900">
      <div className="relative">
        <Link href={`/admin/${details._id}`}>
          <Image
            alt="Property image"
            src={
              details.image_urls.length > 0
                ? `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/images/${details.image_urls[0]}`
                : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            }
            className=" w-full rounded-md object-cover !h-[310px]"
            width={1770}
            height={700}
            priority
          />
        </Link>
        <div className="absolute top-2 left-2 bg-[#44c3c3] text-white px-2 py-1 rounded">
          {details.available_for}
        </div>
      </div>

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Price</dt>
            <dd className="text-sm text-gray-500 font-bold">
              ${formatPrice(details.general_details.price)}
            </dd>

            <div className="rounded-full bg-yellow-500 py-1 px-2 text-xs font-medium text-white w-20 my-3 flex items-center justify-center">
              {details.category === "new" ? "New" : details.category}
            </div>
          </div>
          <div>
            <dt className="sr-only">Address</dt>
            <dd className="font-medium dark:text-teal-600 h-[53px]">
              {details.general_details.address}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-4 text-xs">
          <Feature
            iconColor="text-indigo-700"
            featureName="Kitchen"
            value={`${details.room_interior.kitchens} room`}
            Icon={BathroomIcon}
          />
          <Feature
            iconColor="text-indigo-700"
            featureName="Bedroom"
            value={`${details.room_interior.bedrooms} room`}
            Icon={BedroomIcon}
          />
        </div>
      </div>

      {isAdmin && (
        <div className="flex justify-between mt-4 space-x-2">
          <Link
            href={`/admin/${details._id}`}
            className="text-green-500 flex items-center"
          >
            <svg
              className="h-4 w-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <ViewIcon />
            </svg>
            View
          </Link>
          <div className="flex justify-between gap-3">
            {details.category != "sold" && (
              <button onClick={handleEdit} className="text-blue-500">
                Edit
              </button>
            )}
            <button onClick={handleDelete} className="text-red-500">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
