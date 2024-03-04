// import CountUp from "react-countup";
// import VisibilitySensor from "react-visibility-sensor";

import HomeHeader from "@/components/_/headers/HomeHeader";
import AboutSectionOne from "@/components/pages/home/About/AboutSectionOne";
import Brands from "@/components/pages/home/Brands";
import ScrollUp from "@/components/pages/home/Common/ScrollUp";
import Contact from "@/components/pages/home/Contact";
import Features from "@/components/pages/home/Features";
import Hero from "@/components/pages/home/Hero";
import Testimonials from "@/components/pages/home/Testimonials";
import Video from "@/components/pages/home/Video";

export default function Main() {
  return (
    <>
      <HomeHeader />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      <Testimonials />
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
