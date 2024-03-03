import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-6xl w-full items-center justify-between text-sm lg:flex">
        <div className="mx-auto p-4">
            <p className="font-thin text-xs">Texto delgado y tamaño extra pequeño.</p>
            <p className="font-light text-sm">Texto ligero y tamaño pequeño.</p>
            <p className="font-normal text-base">Texto normal y tamaño base.</p>
            <p className="font-medium text-lg">Texto mediano y tamaño grande.</p>
            <p className="font-semibold text-xl">Texto seminegrita y tamaño extra grande.</p>
            <p className="font-bold text-2xl">Texto en negrita y tamaño 2 extra grande.</p>
            <p className="font-extrabold text-3xl">Texto en extranegrilla y tamaño 3 extra grande.</p>
            <p className="font-black text-4xl">Texto en negro y tamaño 4 extra grande.</p>
        </div>
      </div>
    </main>
  );
}
