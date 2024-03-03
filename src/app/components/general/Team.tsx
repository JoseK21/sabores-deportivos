import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Team = () => {
  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <Avatar>
        <AvatarImage src="https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <h2 className="text-sm font-medium leading-none mt-2">Nombre</h2>

      <Input type="number" className="mt-4" />
    </div>
  );
};
export default Team;
