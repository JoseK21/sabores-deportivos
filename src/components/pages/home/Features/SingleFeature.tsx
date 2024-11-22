import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { title, paragraph } = feature;

  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-4 flex items-center rounded-md bg-opacity-10 text-primary">
          <feature.icon className="w-10 h-10 text-primaty" />
        </div>
        <h3 className="mb-5 text-xl font-semibold text-black">
          {title}
        </h3>
        <p className="pr-[10px] font-light text-justify">{paragraph}</p>
      </div>
    </div>
  );
};

export default SingleFeature;
