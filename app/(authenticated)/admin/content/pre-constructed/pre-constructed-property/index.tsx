"use client";

import { useAuth } from "@/contexts/auth-provider";
import { truncateText } from "@/helpers/utils";
import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { deleteProperty, fetchProperties } from "../../actions";
import { PropertiesListFallback } from "../../components";
import { PropertyEntity } from "../../form/featured-sold-property-form/types";
import { useToast } from "@/contexts/toast-context";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const ViewIcon = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 4.5C7.30558 4.5 3.5 8.30558 3.5 13S7.30558 21.5 12 21.5 20.5 17.6944 20.5 13 16.6944 4.5 12 4.5zm0 3c1.89949 0 3.5 1.60051 3.5 3.5S13.89949 14.5 12 14.5 8.5 12.89949 8.5 11 10.10051 7.5 12 7.5zm0 1.5c-.55964 0-1 .44036-1 1s.44036 1 1 1 1-.44036 1-1-.44036-1-1-1z"
  />
);

interface PreConstructedProjectProps {
  onEdit: (id: string) => void;
}
const PreConstructedProject: React.FC<PreConstructedProjectProps> = ({
  onEdit,
}) => {
  const [properties, setProperties] = useState<PropertyEntity[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const pathname = usePathname();
  const { loading, logout } = useAuth();
  const { showToast } = useToast();

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
          prevProperties.filter((prop) => prop._id !== propertyId)
        );
        showToast("Property deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting property:", error);
        showToast("Error deleting property. Please try again.", "error");
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
        <SectionTitle
          title="Latest Pre-Construction Properties"
          description=""
        />
        {loadingData ? (
          <PropertiesListFallback />
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
                  <Link href={`/admin/${card._id}`}>
                    <Image
                      src={
                        card.image_urls.length > 0
                          ? `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/images/${card.image_urls[0]}`
                          : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                      }
                      alt="Property Image"
                      width={600}
                      height={300}
                      className="!h-[310px]"
                      priority
                    />
                  </Link>
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

                    {pathname === "/admin" && (
                      <div className="flex justify-between mt-4 space-x-2">
                        <Link
                          href={`/admin/${card._id}`}
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
                          <button
                            onClick={() => handleEdit(card._id)}
                            className="text-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(card._id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
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

export default PreConstructedProject;
