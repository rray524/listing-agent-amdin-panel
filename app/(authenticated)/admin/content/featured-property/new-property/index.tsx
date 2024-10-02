"use client";

import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { deleteProperty, fetchProperties } from "../../actions";
import { PropertiesListFallback } from "../../components";
import { PropertyEntity } from "../../form/featured-sold-property-form/types";
import PropertyCard from "@/app/(defaults)/content/cards/property-card";
import { useToast } from "@/contexts/toast-context";
import { ToastContainer } from "react-toastify";

interface FeaturedListingProps {
  onEdit: (id: string) => void;
}
const FeaturedListing: React.FC<FeaturedListingProps> = ({ onEdit }) => {
  const [property, setProperty] = useState<PropertyEntity[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [filter, setFilter] = useState<"new" | "sold" | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(property.length / itemsPerPage);
  const pathname = usePathname();
  const { loading, logout } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        let data;
        if (filter === "all") {
          const [featuredData, soldData] = await Promise.all([
            fetchProperties("?category=new"),
            fetchProperties("?category=sold"),
          ]);
          data = [...featuredData.data, ...soldData.data];
        } else {
          data = await fetchProperties(`?category=${filter}`);
          data = data.data;
        }
        setProperty(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingData(false);
      }
    };
    if (!loading) {
      fetchData();
    }
  }, [loading, logout, filter]);

  const handleEdit = (propertyId: string) => {
    onEdit(propertyId);
  };

  const handleDelete = async (propertyId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (confirmDelete) {
      try {
        const res = await deleteProperty(propertyId);
        setProperty((prevProperties) =>
          prevProperties.filter((prop) => prop._id !== propertyId)
        );
        showToast("Property deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting property:", error);
        showToast("Error deleting property. Please try again.", "error");
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
      <div className=" mb-4 w-full flex justify-end">
        <label htmlFor="propertyFilter" className="sr-only">
          Filter Properties
        </label>
        <div className="relative">
          <select
            id="propertyFilter"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "new" | "sold" | "all")
            }
            className="block w-full p-2 pl-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="all">All Properties</option>
            <option value="new">New Properties</option>
            <option value="sold">Sold Properties</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap -mx-4 my-10">
        <SectionTitle
          title={
            filter === "new"
              ? "New Properties"
              : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Properties`
          }
          description=""
        />

        {loadingData ? (
          <PropertiesListFallback />
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
      {currentItems.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}

      <ToastContainer />
    </section>
  );
};

export default FeaturedListing;
