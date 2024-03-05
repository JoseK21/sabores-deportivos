import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

const player = [
  {
    name: "Oscar",
    points: 22,
    position: 1,
  },
  {
    name: "Steve",
    points: 64,
    position: 2,
  },
  {
    name: "Tina",
    points: 94,
    position: 3,
  },
  {
    name: "Quincy",
    points: 13,
    position: 4,
  },
  {
    name: "Ian",
    points: 83,
    position: 5,
  },
  {
    name: "Tina",
    points: 12,
    position: 6,
  },
  {
    name: "Grace",
    points: 66,
    position: 7,
  },
  {
    name: "Eva",
    points: 45,
    position: 8,
  },
  {
    name: "Kevin",
    points: 42,
    position: 9,
  },
  {
    name: "Mike",
    points: 3,
    position: 10,
  },
  {
    name: "Grace",
    points: 62,
    position: 11,
  },
  {
    name: "Rachel",
    points: 56,
    position: 12,
  },
];

const Page = () => {
  return (
    <main>
      <section>
        <div className="flex flex-row justify-between items-center my-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">Rankings</h2>
          </div>

          <Select>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Torneo Clausura 23-24" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Torneo Clausura 22-23</SelectItem>
              <SelectItem value="dark">Torneo Clausura 21-22</SelectItem>
              <SelectItem value="system">Torneo Clausura 20-21</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs  uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Posición
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Puntos
              </th>
            </tr>
          </thead>
          <tbody>
            {player.map(({ name, points, position }) => (
              <tr
                key={`${name}-${position}=${points}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{position}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {name}
                </th>
                <td className="px-6 py-4">{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full my-6 flex justify-center">
        <Button>Ver Mas</Button>
      </div>
    </main>
  );
};

export default Page;
