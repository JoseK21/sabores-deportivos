import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getFirstChars } from "@/utils/string";
import { Team } from "@/types/team";

const TeamInfo = ({ id, name, abbr, logoUrl, colors }: Team) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center self-start min-w-14 max-w-20">
      <Avatar>
        <AvatarImage src={logoUrl} />
        <AvatarFallback>{getFirstChars(name)}</AvatarFallback>
      </Avatar>

      <h2 className="text-sm font-medium leading-none mt-2 text-center">{name || "-"}</h2>

      {/* <Input type="number" className="mt-4" /> */}
    </div>
  );
};
export default TeamInfo;
