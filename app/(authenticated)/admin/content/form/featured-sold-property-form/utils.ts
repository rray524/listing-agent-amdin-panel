import { PropertyEntity } from "./types";

export const tabs = [
  { field: "category", label: "Category" },
  { field: "general_details", label: "General Details" },
  { field: "room_interior", label: "Room Interior" },
  { field: "exterior", label: "Exterior" },
  { field: "utilities", label: "Utilities" },
  { field: "at_a_glance", label: "At a Glance" },
  { field: "map", label: "Map" },
];

export const validateForm = (formData: PropertyEntity) => {
  const newErrors: { [key: string]: string } = {};
  const latitudeRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,100}$/;
  const longitudeRegex =
    /^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,100}$/;

  if (formData.category === "pre-constructed" && !formData.name) {
    newErrors.name = "Name is required";
  }
  if (!formData.category) newErrors.category = "Category is required";
  if (!formData.available_for)
    newErrors.available_for = "Available for is required";
  if (!formData.listing_id) newErrors.listing_id = "Listing ID is required";
  if (!formData.property_description)
    newErrors.property_description = "Property description is required";
  if (formData.property_images.length < 1) {
    newErrors.property_images = "At least one property image is required.";
  } else if (formData.property_images.length > 4) {
    newErrors.property_images =
      "No more than four property images are allowed.";
  }

  if (!formData.city) newErrors.city = "City is required";
  if (!formData.state) newErrors.state = "State is required";
  if (!formData.country) newErrors.country = "Country is required";
  if (!formData.pincode) newErrors.pincode = "Pincode is required";
  if (!formData.square_feet) newErrors.square_feet = "Square feet is required";

  const { general_details, room_interior, exterior, utilities, at_a_glance } =
    formData;

  if (!general_details.price)
    newErrors.general_details_price = "Price is required";
  if (!general_details.taxes)
    newErrors.general_details_taxes = "Taxes are required";
  if (!general_details.address)
    newErrors.general_details_address = "Address is required";
  if (!general_details.lot_size)
    newErrors.general_details_lot_size = "Lot size is required";
  if (!general_details.directions)
    newErrors.general_details_directions = "Directions are required";

  if (!room_interior.rooms)
    newErrors.room_interior_Rooms = "Number of rooms is required";
  if (!room_interior.rooms_plus)
    newErrors.room_interior_Rooms_plus = "Number of rooms plus is required";
  if (!room_interior.bedrooms)
    newErrors.room_interior_bedrooms = "Number of bedrooms is required";
  if (!room_interior.bedrooms_plus)
    newErrors.room_interior_bedrooms_plus =
      "Number of bedrooms plus is required";
  if (!room_interior.kitchens)
    newErrors.room_interior_kitchens = "Number of kitchens is required";
  if (!room_interior.family_room)
    newErrors.room_interior_family_room = "Family room info is required";
  if (!room_interior.basement)
    newErrors.room_interior_basement = "Basement info is required";

  if (!exterior.property_type)
    newErrors.exterior_property_type = "Property type is required";
  if (!exterior.style) newErrors.exterior_style = "Style is required";
  if (!exterior.exterior)
    newErrors.exterior_exterior = "Exterior info is required";
  if (!exterior.garage_type)
    newErrors.exterior_garage_type = "Garage type is required";
  if (!exterior.drive_parking_spaces)
    newErrors.exterior_drive_parking_spaces =
      "Drive parking spaces info is required";
  if (!exterior.pool) newErrors.exterior_pool = "Pool info is required";

  if (!utilities.fireplace_stove)
    newErrors.utilities_fireplace_stove = "Fireplace/Stove info is required";
  if (!utilities.heat_source)
    newErrors.utilities_heat_source = "Heat source is required";
  if (!utilities.heat_type)
    newErrors.utilities_heat_type = "Heat type is required";
  if (!utilities.central_air_conditioning)
    newErrors.utilities_central_air_conditioning =
      "Central air conditioning info is required";
  if (!utilities.laundry_level)
    newErrors.utilities_laundry_level = "Laundry level is required";
  if (!utilities.sewers) newErrors.utilities_sewers = "Sewers info is required";
  if (!utilities.water) newErrors.utilities_water = "Water info is required";

  if (!at_a_glance.type) newErrors.at_a_glance_type = "Type is required";
  if (!at_a_glance.area) newErrors.at_a_glance_area = "Area is required";
  if (!at_a_glance.municipality)
    newErrors.at_a_glance_municipality = "Municipality is required";
  if (!at_a_glance.neighborhood)
    newErrors.at_a_glance_neighborhood = "Neighborhood is required";
  if (!at_a_glance.style) newErrors.at_a_glance_style = "Style is required";
  if (!at_a_glance.lot_size)
    newErrors.at_a_glance_lot_size = "Lot size is required";
  if (!at_a_glance.tax) newErrors.at_a_glance_tax = "Tax info is required";
  if (!at_a_glance.beds)
    newErrors.at_a_glance_beds = "Number of beds is required";
  if (!at_a_glance.baths)
    newErrors.at_a_glance_baths = "Number of baths is required";
  if (!at_a_glance.fireplace)
    newErrors.at_a_glance_fireplace = "Fireplace info is required";
  if (!at_a_glance.pool) newErrors.at_a_glance_pool = "Pool info is required";

  if (!formData.latitude) {
    newErrors.latitude = "Latitude is required";
  } else if (!latitudeRegex.test(formData.latitude)) {
    newErrors.latitude = "Invalid latitude format.";
  }

  if (!formData.longitude) {
    newErrors.longitude = "Longitude is required";
  } else if (!longitudeRegex.test(formData.longitude)) {
    newErrors.longitude = "Invalid longitude format.";
  }

  console.log("newErrors", newErrors);

  return newErrors;
};

export const hasTabErrors = (errors: any, tab: string) => {
  switch (tab) {
    case "category":
      return !!(
        errors.category ||
        errors.price ||
        errors.available_for ||
        errors.listing_id ||
        errors.property_description ||
        errors.property_images
      );
    case "general_details":
      return !!(
        errors.general_details_price ||
        errors.general_details_taxes ||
        errors.general_details_address ||
        errors.general_details_lot_size ||
        errors.general_details_directions ||
        errors.square_feet ||
        errors.pincode ||
        errors.city ||
        errors.country ||
        errors.state
      );
    case "room_interior":
      return !!(
        errors.room_interior_rooms ||
        errors.room_interior_rooms_plus ||
        errors.room_interior_bedrooms ||
        errors.room_interior_bedrooms_plus ||
        errors.room_interior_kitchens ||
        errors.room_interior_family_room ||
        errors.room_interior_basement
      );
    case "exterior":
      return !!(
        errors.exterior_property_type ||
        errors.exterior_style ||
        errors.exterior_exterior ||
        errors.exterior_garage_type ||
        errors.exterior_drive_parking_spaces ||
        errors.exterior_pool
      );
    case "utilities":
      return !!(
        errors.utilities_fireplace_stove ||
        errors.utilities_heat_source ||
        errors.utilities_heat_type ||
        errors.utilities_central_air_conditioning ||
        errors.utilities_laundry_level ||
        errors.utilities_sewers ||
        errors.utilities_water
      );
    case "at_a_glance":
      return !!(
        errors.at_a_glance_type ||
        errors.at_a_glance_area ||
        errors.at_a_glance_municipality ||
        errors.at_a_glance_neighbourhood ||
        errors.at_a_glance_style ||
        errors.at_a_glance_lot_size ||
        errors.at_a_glance_tax ||
        errors.at_a_glance_beds ||
        errors.at_a_glance_baths ||
        errors.at_a_glance_fireplace ||
        errors.at_a_glance_pool
      );
    case "map":
      return !!(errors.latitude || errors.longitude);
    default:
      return false;
  }
};
