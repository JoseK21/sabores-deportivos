import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Team from "./Team";

const EventCard = () => {
  return (
    <Card className=" w-auto min-w-80">
      <CardHeader>
        <CardDescription className="flex justify-between">
          <span>3:00PM</span>
          <span className=" text-primary-600 font-semibold">+ 3Pts</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center rounded-md border p-4 justify-between">
          <Team />
          <span className="">VS</span>
          <Team />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Enviar</Button>
      </CardFooter>
    </Card>
  );
};
export default EventCard;
