"use client";
import React, { useEffect, useState } from "react";
import { SVG, Tab, TabNested } from "./content/components";
import FeaturedListing from "./content/featured-property/new-property";
import PropertyForm from "./content/form/featured-sold-property-form";
import PreConstructedProject from "./content/pre-constructed/pre-constructed-property";
import { useAuth } from "@/contexts/auth-provider";
import Preloader from "@/theme/components/preloader/preloader";
import { useRouter } from "next/navigation";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [activeNestedTab, setActiveNestedTab] = useState(0);
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <Preloader />;
  }
  const tabs = [
    {
      name: "New/Sold Property",
      icon: (
        <SVG viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </SVG>
      ),
      content: (
        <>
          {activeNestedTab === 0 && (
            <FeaturedListing
              onEdit={(id: string) => {
                setPropertyId(id);
                setActiveNestedTab(1);
              }}
            />
          )}
          {activeNestedTab === 1 && (
            <PropertyForm
              key={`new-${propertyId || "new"}`}
              category="new"
              propertyId={propertyId}
              onClose={() => {
                setPropertyId(null);
                setActiveNestedTab(0);
              }}
            />
          )}
        </>
      ),
    },
    {
      name: "Pre-Constructed Property",
      icon: (
        <SVG viewBox="0 0 18 18">
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </SVG>
      ),
      content: (
        <>
          {activeNestedTab === 2 && (
            <PreConstructedProject
              onEdit={(id) => {
                setPropertyId(id);
                setActiveNestedTab(3);
              }}
            />
          )}
          {activeNestedTab === 3 && (
            <PropertyForm
              key={`pre-${propertyId || "pre"}`}
              category="pre-constructed"
              propertyId={propertyId}
              onClose={() => {
                setPropertyId(null);
                setActiveNestedTab(2);
              }}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="lg:flex">
        <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 ">
          {tabs.map((tab, index) => (
            <div key={index}>
              <Tab
                onClick={() => {
                  setActiveTab(index);
                  setPropertyId(null);
                  {
                    index === 0 ? setActiveNestedTab(0) : setActiveNestedTab(2);
                  }
                }}
                isActive={activeTab === index}
              >
                <>
                  {tab.icon}
                  {tab.name}
                </>
              </Tab>
              {index == 0 && (
                <>
                  <TabNested
                    onClick={() => {
                      setActiveNestedTab(0);
                      setActiveTab(0);
                      setPropertyId(null);
                    }}
                    isActive={activeNestedTab === 0}
                  >
                    New/Sold Property Lists
                  </TabNested>
                  <TabNested
                    onClick={() => {
                      setActiveNestedTab(1);
                      setActiveTab(0);
                      setPropertyId(null);
                    }}
                    isActive={activeNestedTab === 1}
                  >
                    Create New/Sold Properties
                  </TabNested>
                </>
              )}
              {index == 1 && (
                <>
                  <TabNested
                    onClick={() => {
                      setActiveTab(1);
                      setActiveNestedTab(2);
                      setPropertyId(null);
                    }}
                    isActive={activeNestedTab === 2}
                  >
                    Pre-constructed Property Lists
                  </TabNested>
                  <TabNested
                    onClick={() => {
                      setActiveTab(1);
                      setActiveNestedTab(3);
                      setPropertyId(null);
                    }}
                    isActive={activeNestedTab === 3}
                  >
                    Create Pre-constructed Properties
                  </TabNested>
                </>
              )}
            </div>
          ))}
        </ul>
        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default Page;
