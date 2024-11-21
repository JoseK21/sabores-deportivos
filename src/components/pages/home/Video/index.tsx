"use client";

import { YouTubeEmbed } from "@next/third-parties/google";

const Video = () => {
  return (
    <section className=" z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <YouTubeEmbed videoid="ogfYd705cRs" height={400} style="margin: auto" />
      </div>
    </section>
  );
};

export default Video;
