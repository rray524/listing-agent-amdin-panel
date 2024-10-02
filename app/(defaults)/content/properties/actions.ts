export const fetchProperties = async (query: string, pageSize = 100) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const url = new URL(
        `${process.env.NEXT_PUBLIC_PROPERTY_BACKEND_URL}/api/website-properties${query}`
      );

      const finalPageSize =
        pageSize === Infinity ? Number.MAX_SAFE_INTEGER : pageSize;
      url.searchParams.append("page_size", finalPageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const deleteProperty = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/website-properties/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete property");
    }
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};
