"use client";

import withAuth from "@/helpers/with-auth-hoc";

import React from "react";

const SinglePageLayout = ({ children }: { children: React.ReactNode }) => {
  return <section>{children}</section>;
};

export default withAuth(SinglePageLayout);
