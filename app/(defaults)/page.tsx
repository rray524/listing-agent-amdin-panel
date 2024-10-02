import { Metadata } from "next";
import React from "react";
import LoginAgent from "./login/page";

export const metadata: Metadata = {
  title: "Login Page",
};

const Home = () => {
  return <LoginAgent />;
};

export default Home;
