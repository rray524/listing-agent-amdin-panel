export const generateListingId = () => {
  return `ID-${Math.random().toString(36).substr(2, 9)}`; // Example ID generation logic
};

export const generateRandomId = () => {
  const prefix = "NXYZ";
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // generates a 6-digit random number
  return `${prefix}${randomNumber}`;
};
