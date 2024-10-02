import React from "react";
import PropertySummary from "./summary/property-summary";
import ImageSlider from "./gallery/product-gallery";
import Tabs from "./tabs";
import AtAGlanceComponent from "./highlight-section/at-a-glance";
import StreetView from "./map";
import LeadForm from "./lead-form";
import { fetchProperty } from "./actions";
import { PropertyDetails } from "./types";

type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props) {
  const res = await fetchProperty(params.id);
  const property = res.data as PropertyDetails;

  return {
    title: property?.exterior.property_type || "Property Details",
    description:
      property?.property_description || "Detailed view of the property",
  };
}
const PropertyDetailsPage = async ({ params }: Props) => {
  const res = await fetchProperty(params.id);
  const property = res.data as PropertyDetails;

  return (
    <div className="container mx-auto">
      <PropertySummary details={property} />
      <div className="flex justify-between items-center gap-3 max-md:flex-col">
        <ImageSlider
          images={property?.image_urls}
          category={property?.category}
        />
        <LeadForm />
      </div>
      <div className="flex justify-between items-center gap-3 max-lg:flex-col">
        <Tabs property={property} />
        <AtAGlanceComponent details={property?.at_a_glance} />
      </div>
      <StreetView details={property} />
    </div>
  );
};

export default PropertyDetailsPage;
