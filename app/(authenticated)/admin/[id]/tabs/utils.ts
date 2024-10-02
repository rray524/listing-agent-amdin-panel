export const formatPrice = (value: string | number): string => {
  if (typeof value === "number") {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const numberValue = parseFloat(value.replace(/,/g, ""));
  return numberValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
