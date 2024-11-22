import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 pb-8 pt-12 mx-auto space-y-12">
        <div className="items-center">
          <div className="text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Caracteristicas Principales
            </h2>
            <p className="mb-8 font-light lg:text-xl">
              Descubre las funcionalidades que hacen de nuestra plataforma la mejor opción para disfrutar tus eventos
              deportivos y apoyar a los comercios locales.
            </p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map((feature) => (
                <SingleFeature key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
