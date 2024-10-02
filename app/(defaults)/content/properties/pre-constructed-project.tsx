"use client";

import ButtonRegister from "@/components/button/button-register";
import { useAuth } from "@/contexts/auth-provider";
import { truncateText } from "@/helpers/utils";
import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { deleteProperty, fetchProperties } from "./actions";
import { PropertyEntity } from "@/app/(authenticated)/admin/content/form/featured-sold-property-form/types";

interface PreConstructedProjectProps {
  onEdit: (id: string) => void;
}
const PreConstructedProject: React.FC<PreConstructedProjectProps> = ({
  onEdit,
}) => {
  const [properties, setProperties] = useState<PropertyEntity[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const pathname = usePathname();
  const { isAuthenticated, loading, logout } = useAuth();
  const handleEdit = (propertyId: string) => {
    onEdit(propertyId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const data = await fetchProperties(`?category=pre-constructed`);
        setProperties(data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading, logout]);

  const handleDelete = async (propertyId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (confirmDelete) {
      try {
        const res = await deleteProperty(propertyId);
        setProperties((prevProperties) =>
          prevProperties.filter((prop) => prop.listing_id !== propertyId)
        );
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const currentItems = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4 my-10">
        <SectionTitle title="Latest Pre-Construction Projects" description="" />
        {loadingData ? (
          <div className="container">
            <div className="flex flex-wrap -mx-4 my-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className={`w-full ${
                    pathname === "/admin"
                      ? "lg:w-full xl:w-1/3 "
                      : "xl:w-1/4 lg:w-1/3 md:w-1/2"
                  } px-4 mb-8`}
                  key={index}
                >
                  <div key={index} className="border border-gray-200 p-4">
                    <div className="animate-pulse space-y-2">
                      <div className="bg-gray-200 h-48"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-16 bg-gray-200 w-full"></div>
                        <div className="space-x-2 flex">
                          <div className="h-8 bg-gray-200 w-full"></div>
                          <div className="h-8 bg-gray-200 w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : currentItems.length !== 0 ? (
          currentItems.map((card, index) => (
            <div
              key={index}
              className={`w-full ${
                pathname === "/admin"
                  ? "lg:w-full xl:w-1/3 "
                  : "xl:w-1/4 lg:w-1/3 md:w-1/2"
              } px-4 mb-8`}
            >
              <div className="rounded overflow-hidden shadow-lg hover:shadow-xl dark:bg-gray-900">
                <div className="relative">
                  <Image
                    src={
                      card.property_images.length > 0
                        ? `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/images/${card.image_urls[0]}`
                        : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    }
                    alt="Property Image"
                    width={600}
                    height={300}
                    layout="responsive"
                    className="!h-[310px]"
                    priority
                  />
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded">
                    {card.available_for}
                  </div>
                </div>
                <div className="px-4 py-4">
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-teal-600 pb-3">
                      {truncateText(card.name, 21)}
                    </h2>
                    <p className="dark:text-teal-600 my-2 text-sm h-[53px]">
                      {card.general_details.address}
                    </p>
                    <ButtonRegister
                      href={`${card.listing_id}`}
                      text={"Read More"}
                    />
                    {pathname === "/admin" && (
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          onClick={() => handleEdit(card.listing_id)}
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(card.listing_id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className=" max-h-14 container mx-auto">
            <h4 className="text-gray-600 dark:text-gray-100 text-center font-bold">
              No property listed yet!
            </h4>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </section>
  );
};

export default PreConstructedProject;
