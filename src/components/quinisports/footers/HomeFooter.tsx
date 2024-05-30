import Image from "next/image";
import Link from "next/link";

const HomeFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <Image src="/logo.png" width={120} height={120} alt="Picture of the author" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Siguenos En</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="https://www.facebook.com/share/T6AP32G5TDniLbgu/?mibextid=LQQJ4d" target="_blank" className="hover:underline ">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/quinisports?igsh=MWxkMnJpMnhlbHIwMg==" target="_blank" className="hover:underline">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/politicas-de-privacidad" className="hover:underline">
                    Politica de Privacidad
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/terminos-y-condiciones" className="hover:underline">
                    Terminos &amp; Condiciones
                  </Link>
                </li>
                <li>
                  <a href="/preguntas-frecuentes" className="hover:underline">
                    Información
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://jdatabyte.com" target="_blacnk" className="hover:underline">
              JDataByte™
            </a>
            . Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
};
export default HomeFooter;
