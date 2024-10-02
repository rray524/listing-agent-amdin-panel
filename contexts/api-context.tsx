"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const GoogleMapsLoaderContext = createContext<string | undefined>(undefined);

export const GoogleMapsLoaderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const apiKey = process.env.NEXT_PUBLIC_SITE_KEY!;

  return (
    <GoogleMapsLoaderContext.Provider value={apiKey}>
      {children}
    </GoogleMapsLoaderContext.Provider>
  );
};

export const useGoogleMapsApiKey = () => {
  const context = useContext(GoogleMapsLoaderContext);
  if (!context) {
    throw new Error(
      "useGoogleMapsApiKey must be used within a GoogleMapsLoaderProvider"
    );
  }
  return context;
};
