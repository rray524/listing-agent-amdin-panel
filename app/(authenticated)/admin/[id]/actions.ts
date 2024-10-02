export const fetchProperty = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/api/all-properties/${id}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }
};
