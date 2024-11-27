/* eslint-disable @next/next/no-img-element */
const menu = [
  {
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
      <div className="w-full h-[320px] bg-fixed bg-[url('https://mitierrarestaurante.com/wp-content/uploads/2020/10/IMG_5667.jpg')] bg-blend-lighten bg-cover bg-no-repeat bg-center z-0">
        <div className="container flex flex-col justify-center items-center h-full text-white ">
          <p className="text-end text-[100px] font-yanone-kaffeesatz font-semibold leading-none">MENÚ</p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap bg-[#EB262A] pt-20 pb-10 justify-center text-white gap-6">
        <div>
          <p>
            <strong className="font-yanone-kaffeesatz font-semibold text-4xl">Refrescos Naturales</strong>
            <br />
            Cas (pulpa) 1.050
            <br />
            Mora (pulpa) 1.050
            <br />
            Té frío (de la casa) 1.050
            <br />
            Fresa 2.150
            <br />
            Guanábana 2.150
            <br />
            Maracuya 2.150
            <br />
            Zanahoria con naranja 2.150
            <br />
            Limonada (Tradicional, Hierbabuena) 2.150
            <br />
            Piña (Tradicional) 2.150
            <br />
            Piña (con Hierbabuena, con Arroz) 2.150
            <br />
            Tamarindo 2.150
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong  className="font-yanone-kaffeesatz font-semibold text-4xl">Gaseosas</strong>
            <br />
            Ginger Ale 1.825
            <br />
            Kolita 1.825
            <br />
            7 UP 1.825
            <br />
            Agua embotellada 1.550
            <br />
            Soda (355ml) 1.250
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong  className="font-yanone-kaffeesatz font-semibold text-4xl">Refrescos en Leche</strong>
            <br />
            Guanábana 2.350
            <br />
            Resbaladera 2.350
            <br />
            Horchata 2.350
            <br />
            Crema en leche 2.150
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong  className="font-yanone-kaffeesatz font-semibold text-4xl">Licores</strong>
            <br />
            Pilsen, Imperial, Silver, Light 1.850
            <br />
            Bavaria Light, Bavaria Gold 2.400
            <br />
            Heineken, Corona, Smirnoff Ice 2.950
            <br />
            Trago Ron Centenario 2.250
            <br />
            Trago Chivas 3.350
            <br />
            Trago de Etiqueta Roja 2.250
            <br />
            Trago de Etiqueta Negra 3.250
            <br />
            Trago Old Parr 3.750
            <br />
            Vodka 1.850
            <br />
            Baileys 2.450
            <br />
            José Cuervo Oscuro 2.100
            <br />
            Copa de Vino Blanco, Tinto o Rosado 2.975
            <br />
            Michelada 450
            <br />
            Sangría 3.750
            <br />
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-3 h-[700px] bg-red-500 p-10">
        <div className="bg-white h-full flex flex-col justify-center items-center p-20">
          <p className="font-bold text-7xl font-yanone-kaffeesatz">INFORMACIÓN DE CONTACTO</p>
          <p>Tel: (506) 2553-3737</p>
          <p>(506) 2551-7090</p>
          <p>E-mail: mitierrarestaurante@hotmail.com</p>
          <p>2 Km Este del puente Bailey, carretera al Volcán Irazú Cartago, Costa Rica</p>
        </div>
      </div>
    </>
  );
}
