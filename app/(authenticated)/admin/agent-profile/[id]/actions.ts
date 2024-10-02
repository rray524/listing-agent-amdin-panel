import axios from "axios";

export const fetchAgentData = async () => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    }
  } catch (error) {
    console.error("Error fetching agent data:", error);
    throw error;
  }
};

export const updateAgentData = async (agentId: string, data: any) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/agent/${agentId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating agent data:", error);
    throw error;
  }
};
