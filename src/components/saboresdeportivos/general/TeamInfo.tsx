import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getFirstChars } from "@/utils/string";
import { Team } from "@prisma/client";

const TeamInfo = ({ id, name, logoUrl, colors }: Team) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center self-start min-w-14 max-w-20">
      <Avatar>
        <AvatarImage src={logoUrl} alt={getFirstChars(name)} />
        <AvatarFallback>{getFirstChars(name)}</AvatarFallback>
      </Avatar>

      <span className="text-sm font-medium leading-none mt-2 text-center">{name || "-"}</span>

      {/* <Input type="number" className="mt-4" /> */}
    </div>
  );
};
export default TeamInfo;
