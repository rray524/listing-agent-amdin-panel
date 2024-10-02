"use client";

import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { fetchProperties } from "./actions";
import { PropertyEntity } from "@/app/(authenticated)/admin/content/form/featured-sold-property-form/types";
import PropertyCard from "../cards/property-card";

interface FeaturedListingProps {
  onEdit: (id: string) => void;
}
const FeaturedListing: React.FC<FeaturedListingProps> = ({ onEdit }) => {
  const [property, setProperty] = useState<PropertyEntity[]>([]);

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(property.length / itemsPerPage);
  const pathname = usePathname();
  const { loading, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const data = await fetchProperties(`?category=new`);
        setProperty(data.data);
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

  const handleEdit = (propertyId: string) => {
    onEdit(propertyId);
  };

  const handleDelete = async (propertyId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/property/properties/${propertyId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete property");
        }
        setProperty((prevProperties) =>
          prevProperties.filter((prop) => prop.listing_id !== propertyId)
        );
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const currentItems = property.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4 my-10">
        <SectionTitle title="Featured Listings" description="" />
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
          currentItems.map((item, index) => (
            <div
              key={index}
              className={`w-full ${
                pathname === "/admin"
                  ? "lg:w-full xl:w-1/3 "
                  : "xl:w-1/4 lg:w-1/3 md:w-1/2"
              } px-4 mb-8`}
            >
              <PropertyCard
                details={item}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={pathname === "/admin"}
              />
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

export default FeaturedListing;
