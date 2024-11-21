import Image from "next/image";

export default function Main() {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">
          <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
            Bienevenido, a Sabores Deportivos
          </h1>
          <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
            Sitio web para realizar quinielas deportivas, en donde se acumulan puntos para canjearlo por premios de
            nuestros distintos comercios afiliados
          </p>
          <div className="flex justify-center">
            <a
              className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
              href="https://github.com/r1/nine4-2/"
            >
              <span className="justify-center">Find out more</span>
            </a>
          </div>
        </div>
        <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
          {/* <Image
            fill
            className="w-80 md:ml-1 ml-24"
            alt="iPhone-12"
            src="https://unsplash.com/photos/man-in-red-and-white-boxing-gloves-CoTJ4Srrl5E"
          ></Image> */}
        </div>
      </div>
      <div className="grr max-w-7xl pt-20 mx-auto text-center">
        <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-900">Patrocinadores</h1>
      </div>

      <div className="max-w-6xl xl:max-w-6xl mx-auto divide-y divide-gray-200 px-4 sm:px-6 md:px-8">
        <ul className="Footer_nav__2rFid text-sm font-medium  sm:pb-20 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
          <li className="space-y-5 row-span-2">
            <h2 className="text-sm tracking-wide text-gray-900 uppercase font-bold">Company</h2>
            <ul className="space-y-4 text-md">
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Jobs
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Merch
                </a>
              </li>{" "}
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Brand
                </a>
              </li>{" "}
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Meetups
                </a>
              </li>
            </ul>
          </li>
          <li className="space-y-5 row-span-2">
            <h2 className="text-sm tracking-wide text-gray-900 uppercase font-bold">Newsroom</h2>
            <ul className="space-y-4">
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  News
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Press
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Blog
                </a>
              </li>
            </ul>
          </li>
          <li className="space-y-5 row-span-2">
            <h2 className="text-sm tracking-wide text-gray-900 uppercase font-bold">Products</h2>
            <ul className="space-y-4">
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Hosting
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Domains
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Security
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  SSL
                </a>
              </li>
            </ul>
          </li>
          <li className="space-y-5">
            <h2 className="text-sm tracking-wide text-gray-900 uppercase font-bold">Connect</h2>
            <ul className="space-y-4">
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Twitter
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 text-2xl" href="/">
                  Facebook
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900 transition-colors duration-200 font-semibold text-2xl" href="/">
                  Instagram
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
