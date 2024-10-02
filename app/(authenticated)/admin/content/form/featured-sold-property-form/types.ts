export interface GeneralDetails {
  price: string;
  taxes: string;
  address: string;
  lot_size: string;
  directions: string;
}

export interface RoomInterior {
  rooms: number;
  rooms_plus: number;
  bedrooms: number;
  bedrooms_plus: number;
  kitchens: number;
  family_room: string;
  basement: string;
}

export interface Exterior {
  property_type: string;
  style: string;
  exterior: string;
  garage_type: string;
  drive_parking_spaces: number;
  pool: string;
}

export interface Utilities {
  fireplace_stove: string;
  heat_source: string;
  heat_type: string;
  central_air_conditioning: string;
  laundry_level: string;
  sewers: string;
  water: string;
}

export interface AtAGlance {
  type: string;
  area: string;
  municipality: string;
  neighborhood: string;
  style: string;
  lot_size: string;
  tax: string;
  beds: number;
  baths: number;
  fireplace: string;
  pool: string;
}
export interface PropertyImage {
  file: File | null;
  url: string;
  filename?: string;
}
export interface PropertyEntity {
  _id: string;
  name: string;
  category: string;
  available_for: string;
  listing_id: string;
  property_description: string;
  image_urls: string[];
  general_details: GeneralDetails;
  room_interior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  at_a_glance: AtAGlance;
  street_view: string;
  map_location: string;
  latitude: string;
  longitude: string;
  place_id: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
  square_feet: number;
  property_images: PropertyImage[];
  remove_image_urls: string[];
}

export const initialState: PropertyEntity = {
  _id: "",
  name: "",
  category: "",
  available_for: "",
  listing_id: "",
  property_description: "",
  image_urls: [],
  remove_image_urls: [],
  property_images: [],
  general_details: {
    price: "",
    taxes: "",
    address: "",
    lot_size: "",
    directions: "",
  },
  room_interior: {
    rooms: 0,
    rooms_plus: 0,
    bedrooms: 0,
    bedrooms_plus: 0,
    kitchens: 0,
    family_room: "",
    basement: "",
  },
  exterior: {
    property_type: "",
    style: "",
    exterior: "",
    garage_type: "",
    drive_parking_spaces: 0,
    pool: "",
  },
  utilities: {
    fireplace_stove: "",
    heat_source: "",
    heat_type: "",
    central_air_conditioning: "",
    laundry_level: "",
    sewers: "",
    water: "",
  },
  at_a_glance: {
    type: "",
    area: "",
    municipality: "",
    neighborhood: "",
    style: "",
    lot_size: "",
    tax: "",
    beds: 0,
    baths: 0,
    fireplace: "",
    pool: "",
  },
  street_view: "",
  map_location: "",
  latitude: "",
  longitude: "",
  place_id: "",
  pincode: "",
  country: "",
  state: "",
  city: "",
  square_feet: 0,
};

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
  placeholder?: string;
}
