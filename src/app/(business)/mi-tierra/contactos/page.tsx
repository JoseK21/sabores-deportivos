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
      <div className="w-full h-[426px] bg-[url('http://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_5682.jpg')] bg-blend-lighten bg-cover bg-no-repeat bg-center z-0">
        <div className="container flex flex-col justify-center items-center h-full text-white ">
          <p className="text-end text-[100px] font-yanone-kaffeesatz font-semibold leading-none">CONTACTENOS</p>
        </div>
      </div>

      <div className="w-full flex h-[700px]">
        <div className="w-1/2 bg-red-500 p-10">
          <div className="bg-white h-full flex flex-col justify-center items-center p-20">
            <p className="font-bold text-7xl font-yanone-kaffeesatz">INFORMACIÓN DE CONTACTO</p>
            <p>Tel: (506) 2553-3737</p>
            <p>(506) 2551-7090</p>
            <p>E-mail: mitierrarestaurante@hotmail.com</p>
            <p>2 Km Este del puente Bailey, carretera al Volcán Irazú Cartago, Costa Rica</p>
          </div>
        </div>
        <div className="w-1/2 bg-[#142130] text-white flex flex-col justify-center items-start p-20">
          <p className="font-bold text-7xl font-yanone-kaffeesatz"> CONVERSEMOS</p>
          <p className="pb-4"> ¿Dudas o comentarios?</p>
          <p className="font-bold text-lg"> HORARIO</p>
          <p> Lunes &emsp;  6:30 - 21:00</p>
          <p> Martes &emsp;  6:30 - 21:00</p>
          <p> Miércoles &emsp;  6:30 - 21:00</p>
          <p> Jueves &emsp;  6:30 - 21:00</p>
          <p> Viernes &emsp;  6:30 - 21:00</p>
          <p> Sábado &emsp;  6:30 - 21:00</p>
          <p> Domingo &emsp;  6:30 - 19:00</p>
          <p className="mt-5"> Contamos con servicio de alimentación todos los días, excepto Jueves y Viernes Santos</p>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d503124.6076312446!2d-83.901321!3d9.878782!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0dfbac0c7e1c3%3A0xa6f62892d5179801!2sMi%20Tierra%20Restaurant!5e0!3m2!1sen!2sus!4v1732351663624!5m2!1sen!2sus"
        width="100%"
        height="450"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
