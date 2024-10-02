"use client";
import React from "react";
import { useAuth } from "@/contexts/auth-provider";
import AgentProfile from "./[id]/page";
import withAuth from "@/helpers/with-auth-hoc";

const Page = () => {
  const { agent } = useAuth();

  return (
    <div>
      <AgentProfile
        params={{
          id: `${agent?._id}`,
        }}
      />
    </div>
  );
};

export default withAuth(Page);
