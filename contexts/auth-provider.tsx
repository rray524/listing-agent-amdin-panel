"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  agent: any;
  login: (token: string, agentId: string) => void;
  logout: () => void;
  loading: boolean;
  updateAgent: (updatedAgent: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      fetchAgent(token).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [router]);

  const fetchAgent = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAgent(response.data.data.agent_id);
    } catch (err) {
      console.error("Error fetching agent data:", err);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    fetchAgent(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAgent(null);
  };
  const updateAgent = (updatedAgent: any) => {
    setAgent(updatedAgent);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        agent,
        login,
        logout,
        loading,
        updateAgent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
