/* eslint-disable @next/next/no-img-element */
const Hero = () => {
  return (
      <section className="relative z-10 overflow-hidden pb-12">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center flex justify-center flex-col items-center"
                data-wow-delay=".2s"
              >
                <img src="/new-logo.png" className="w-44 mb-5" alt="Logo - Sabores Deportivos" />

                <p className="mt-4 mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  En Sabores Deportivos, unimos la pasión por los deportes y la gastronomía en un solo lugar. Somos la
                  plataforma que conecta a los amantes del deporte con los mejores comercios de tu ciudad, ofreciendo
                  información detallada sobre sus menús, horarios, eventos y más. Nuestro objetivo es potenciar la
                  visibilidad de los comercios locales mientras brindamos a los usuarios una experiencia única para
                  disfrutar de sus deportes favoritos, deliciosos platillos y un ambiente inolvidable. ¡Explora,
                  encuentra y vive la experiencia Sabores Deportivos!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Hero;
