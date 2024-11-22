import React from "react";

import Brands from "@/components/pages/home/Brands";
import ScrollUp from "@/components/pages/home/Common/ScrollUp";
import Hero from "@/components/pages/home/Hero";

const Page = () => {
  return (
    <main>
      <ScrollUp />
      <Hero />
      <Brands />
    </main>
  );
};

export default Page;
