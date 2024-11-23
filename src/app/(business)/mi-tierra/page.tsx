/* eslint-disable @next/next/no-img-element */
import FooterMiTierra from "@/components/(business)/mi-tierra/footer/footer";
import HeaderMiTierra from "@/components/(business)/mi-tierra/header/header";

const top_food = [
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_4165-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "HUEVOS RANCHEROS",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_4135-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "CHORREADA",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_3687-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "POZOL",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_3921-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "COSTILLA CHUMAZAARA",
  },
];

const menu_options = [
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_4042-Edit.jpg",
    title: "Trocitos de Lomo al Sartén",
    description: "Acompañado de arroz, frijoles molidos, pico de gallo, tortillas y plátano maduro",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_9901.jpg",
    title: "Lomito a la Parrilla",
    description: "Acompañado de arroz, frijoles molidos, pico de gallo, tortillas y plátano maduro",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_3788.jpg",
    title: "Pollo Light",
    description:
      "Fajitas de pollo preparadas con aceite de canola PAM, acompañada de elote dulce, frijoles tiernos y ensalada fresca",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2024/08/IMG_0002.jpg",
    title: "Casado con pollo",
    description: "Arroz, frijoles, plátano maduro, picadillo de papa, pico de gallo y tortillas",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_0093.jpg",
    title: "Arroz con Pollo",
    description: "Acompañado de frijolitos molidos, plátano maduro, papas fritas y ensalada",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_0083.jpg",
    title: "Gallo de Lengua en salsa",
    description: "Acompañado de arroz blanco y tortillas",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_3626.jpg",
    title: "Casado Vegetariano",
    description: "Arroz, elote, plátano, aguacate, queso, pico de gallo, tortillas y frijoles",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_3836.jpg",
    title: "Alforja Tica",
    description:
      "Carne de res en trocitos, chorizo frito y una prensadita de queso, frijoles molidos, pico de gallo, maduro y tortillas",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_4190.jpg",
    title: "Lomito Mi Tierra",
    description: "Acompañado con queso fundido, arroz, maduro, frijolitos molidos, pico de gallo y tortilla",
  },
];

export default function PageMiTierra() {
  return (
    <div>
      <HeaderMiTierra />
      <section className="mb-20">
        {/*  */}
        <div className="w-full h-screen bg-fixed bg-[url('https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_6710.jpg')] bg-cover bg-center z-0">
          <div className="container flex flex-col justify-center h-full text-white ">
            <p className="text-[128px] font-yanone-kaffeesatz font-semibold leading-none">
              <span className="">
                LO MEJOR <br /> DE LA COMIDA COSTARRICENSE
              </span>
            </p>

            <span className="my-5">Un lugar diferente para disfrutar con mi gente</span>

            <button className="bg-[#EB262A] w-fit text-3xl px-3 py-2 font-yanone-kaffeesatz">Ver Menú</button>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-row justify-center space-x-20 bg-[#EB262A] w-full h-80 text-white">
          {top_food.map((food) => (
            <div key={food.title} className="flex items-center flex-col justify-center gap-5">
              <img src={food.img} alt="food" className="w-32 h-32 rounded-full" />
              <span className="font-yanone-kaffeesatz text-xl">{food.title}</span>
            </div>
          ))}
        </div>
        {/*  */}
        <div className="container">
          <div className="my-14 flex flex-col items-center">
            <span className="text-6xl font-bold font-yanone-kaffeesatz pb-4">ESCOGÉ Y DISFRUTÁ</span>
            <span>nuestro menú refleja el amor por la comida costarricense</span>
          </div>
          <div className="grid grid-cols-3 gap-5 items-start gap-y-16">
            {menu_options.map((option) => (
              <div key={option.title} className="flex flex-col items-center justify-center text-center">
                <img src={option.img} alt="menu" className="" />
                <h4 className="font-bold text-4xl font-yanone-kaffeesatz pt-3">{option.title}</h4>
                <span className="py-4 text-gray-600 text-sm">{option.description}</span>
                <button className="bg-[#EB262A] w-fit text-3xl text-white px-3 py-2 font-yanone-kaffeesatz">
                  Ver Menú
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-14">
            <button className="bg-[#EB262A] w-fit text-3xl text-white px-6 py-2 font-yanone-kaffeesatz mt-14 self-center">
              Ver Nuestro Menú Completo
            </button>
          </div>
        </div>
        {/*  */}
        <div className="w-full h-screen bg-fixed bg-[url('https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_5667.jpg')] bg-cover bg-center bg-red-500 bg-blend-lighten z-0 flex items-center opacity-100">
          <div className="container">
            <div className="w-1/2 bg-[#142130] flex flex-col justify-center items-center px-10 py-4 text-white">
              <div className="border border-red-600 px-6 py-2 w-fit">SOMOS PROFESIONALES</div>
              <p className="text-[128px] font-yanone-kaffeesatz font-semibold leading-none text-center mt-16 mb-4">
                SALA DE EVENTOS MI TIERRA
              </p>

              <span className="mb-10">Sus eventos personales o corporativos con nosotros</span>

              <button className="bg-[#EB262A] w-fit text-3xl px-3 py-2 font-yanone-kaffeesatz flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  width={26}
                  height={26}
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                COTIZA AHORA
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-[#EB262A] w-full h-64 flex flex-col justify-between items-center">
          <div className="container text-white flex flex-row justify-between items-center h-full">
            <div>
              <span className="text-4xl font-bold">Descargar nuestro menú</span>
              <br />
              <span>Deseas descargar nuestro menú y estar listo para ordenar</span>
            </div>
            <button className="bg-[#EB262A] w-fit text-md px-7 py-2 font-yanone-kaffeesatz flex items-center gap-2 border-2">
              DESCARGAR
            </button>
          </div>
        </div>
        {/*  */}
        <div className="w-full h-64 flex flex-col justify-between items-center">
          <div className="container flex flex-row justify-between items-center h-full">
            <div>
              <span className="text-4xl font-yanone-kaffeesatz font-bold">CONTACTENOS</span>
              <br />
              <span>Por Medio De Nuestras Redes Sociales</span>
              <br />
              <br />

              <div className="flex gap-4">
                <div className="rounded-full bg-[#EB262A] w-8 h-8 flex items-center justify-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 320 512" width={18} height={18}>
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </div>
                <div className="rounded-full bg-[#EB262A] w-8 h-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512" width={18} height={18}>
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col gap-5">
              <label className="font-yanone-kaffeesatz text-xl font-bold">Whatsapp</label>
              <button className="bg-green-600 text-white w-fit text-xl px-3 py-2 font-yanone-kaffeesatz flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  width={26}
                  height={26}
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                Haz click aquí
              </button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="container">
          {/* <GoogleMapsEmbed
            apiKey="AIzaSyBs9PyhCdiqGqzaewv3ZnApTbvM7qxMxnY"
            height={300}
            width="100%"
            mode="place"
            // q="Mi Tierra Restaurant"
          /> */}

<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d503124.6076312446!2d-83.901321!3d9.878782!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0dfbac0c7e1c3%3A0xa6f62892d5179801!2sMi%20Tierra%20Restaurant!5e0!3m2!1sen!2sus!4v1732351663624!5m2!1sen!2sus" width="100%" height="450" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      <FooterMiTierra />
    </div>
  );
}
