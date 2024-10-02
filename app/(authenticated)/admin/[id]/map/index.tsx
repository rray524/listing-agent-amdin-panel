"use client";
import React, { useState } from "react";
import EmbedMap from "./maps/gmap-view";
import { Tab, TabContent } from "../tabs/components";
import StreetMap from "./maps/street-view";

interface PropertyDetails {
  map_location: string;
  street_view: string;
  latitude: string;
  longitude: string;
  place_id: string;
}

interface PropertyCardProps {
  details: PropertyDetails;
}

const StreetView: React.FC<PropertyCardProps> = ({
  details,
}: PropertyCardProps) => {
  const [activeTab, setActiveTab] = useState("streetview");

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  return (
    <div className="rounded border w-[80%] mx-auto mt-4 h-[600px] mb-4">
      {/* Tabs */}
      <ul id="tabs" className="inline-flex pt-2 px-1 w-full border-b">
        <Tab active={activeTab === "streetview"}>
          <a
            href="#general"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("streetview");
            }}
          >
            Street View
          </a>
        </Tab>
        <Tab active={activeTab === "googlemap"}>
          <a
            href="#interior"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("googlemap");
            }}
          >
            Google Map
          </a>
        </Tab>
      </ul>

      <div id="tab-contents">
        <TabContent active={activeTab === "streetview"}>
          <StreetMap details={details} />
        </TabContent>
        <TabContent active={activeTab === "googlemap"}>
          <EmbedMap details={details} />
        </TabContent>
      </div>
    </div>
  );
};

export default StreetView;
