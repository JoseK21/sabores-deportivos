/* eslint-disable @next/next/no-img-element */
const top_food = [
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_4221-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "ENSALADA DE POLLO",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_0083-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "GALLO DE LENGUA EN SALSA",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_3788-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "POLLO LIGHT",
  },
  {
    img: "https://mitierrarestaurante.com/wp-content/uploads/elementor/thumbs/IMG_4135-owkr5tzu5xi4mgnwmo8vcd3girwr31q2mjizr5i6k0.jpg",
    title: "CHORREADA",
  },
];

export default function Page() {
  return (
    <>
      <div className="w-full h-[426px] bg-[url('http://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_5682.jpg')] bg-cover bg-no-repeat bg-center z-0">
        <div className="container flex flex-col justify-center items-end h-full text-white ">
          <p className="text-end text-[100px] font-yanone-kaffeesatz font-semibold leading-none">QUIÉNES SOMOS</p>

          <span className="my-5">desde 2012</span>

          <button className="bg-[#EB262A] w-fit text-3xl px-3 py-2 font-yanone-kaffeesatz">CONTACTENOS</button>
        </div>
      </div>

      {/* SOMOS Comida costarricense */}
      <div className="flex flex-col justify-center items-center py-10 text-white bg-[#EB262A] w-full px-10">
        <span className="font-yanone-kaffeesatz font-medium text-3xl">SOMOS</span>
        <span className="font-yanone-kaffeesatz font-medium text-6xl mt-4 mb-6">COMIDA COSTARRICENSE</span>
        <span className="text-center">
          Restaurante Mi Tierra fue creado el 17 de enero del 2002 con la idea de brindar un servicio de Alimentación
          Típica Costarricense. Nuestra meta es servirle al cliente, calidad de comida, de una manera rápida , amable y
          en un ambiente Familiar.
        </span>
        <div className="flex flex-row justify-center space-x-20 h-80">
          {top_food.map((food) => (
            <div key={food.title} className="flex items-center flex-col justify-center gap-5">
              <img src={food.img} alt="food" className="w-32 h-32 rounded-full" />
              <span className="font-yanone-kaffeesatz text-xl">{food.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reseña historica */}
      <div className="flex flex-col justify-center items-center py-10 w-full px-10">
        <span className="font-yanone-kaffeesatz font-medium text-6xl p-10">RESEÑA HISTORICA</span>

        <div className="flex flex-row max-w-screen-xl justify-center space-x-14">
          <img
            className="w-1/2 h-96"
            src="https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_5686.jpg"
            alt="image"
          />
          <div className="w-1/2 flex flex-col justify-center">
            <span className="text-4xl font-bold font-yanone-kaffeesatz pb-2">NUESTRO FUNDADOR</span>
            <p>
              Restaurante Mi Tierra fue inaugurado en el 2002 por el Señor Carlos Calderón Solano, pensando en darle a
              la provincia de Cartago un nuevo concepto de comida típica costarricense, queriendo rescatar las
              costumbres de nuestros abuelos, tales como el pozol, chorreadas o tortillas palmeadas, entre otros. El
              restaurante está hecho a base de madera en un 60%, y el resto es de acero y otros materiales. Los tipos de
              madera que se utilizaron en la construcción fueron: laurel (Cordia Alliadora), espina blanca (Homolion
              Racemosum ) y melina (Gmelina Arbórea). El uso de estas maderas le da un toque rústico y muy acogedor.
            </p>
          </div>
        </div>
      </div>

      {/* EVENTOS */}
      <div className="w-full h-screen bg-fixed bg-[url('https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_5667.jpg')] bg-cover bg-center bg-red-500 bg-blend-lighten z-0 flex flex-row items-center justify-center">
        <div className="max-w-screen-xl h-full py-24 w-full flex flex-row items-stretch justify-center text-center">
          <div className="w-1/2 relative  bg-[#142130] flex flex-col justify-start items-center px-10 py-4 text-white bg-fixed bg-[url('http://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_4190.jpg')] bg-cover bg-center">
            <div className="opacity-50 bg-[#142130] w-full h-full absolute top-0 left-0"></div>

            <div className="z-10 flex flex-col items-center justify-start">
              <p className="text-5xl font-yanone-kaffeesatz font-semibold leading-none text-center mt-16 mb-4">
                NUESTRO MENÚ
              </p>

              <span className="mb-10">
                Mouthwatering perfection starts with two 100% pure beef patties and best sauce sandwiched between a
                sesame seed bun.
              </span>

              <button className="bg-[#EB262A] w-fit text-3xl px-3 py-2 font-yanone-kaffeesatz flex items-center gap-2">
                Ver Menú
              </button>
            </div>
          </div>
          <div className="w-1/2 bg-[#142130] flex flex-col justify-center items-center px-10 py-4 text-white">
            <p className="text-[128px] font-yanone-kaffeesatz font-semibold leading-none text-center mt-16">
              SALA DE EVENTOS
            </p>

            <p className="text-4xl font-yanone-kaffeesatz font-semibold leading-none text-center m-4">
              PERSONALES O CORPORATIVOS
            </p>

            <span className="mb-10">Asegúrese del éxito de su evento en nuestra cómoda y acogedora sala privada.</span>

            <button className="bg-[#EB262A] w-fit text-3xl px-3 py-2 font-yanone-kaffeesatz flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" width={26} height={26}>
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              COTIZA AHORA
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
