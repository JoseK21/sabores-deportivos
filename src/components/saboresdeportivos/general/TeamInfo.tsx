import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RTeam } from "@/relatedTypes/team";

import { getFirstChars } from "@/utils/string";

const TeamInfo = ({ id, name, logoUrl, colors }: RTeam) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center self-start min-w-14 max-w-20">
      <Avatar>
        <AvatarImage src={logoUrl ?? '/assets/default-team.png'} alt={getFirstChars(name)} />
        <AvatarFallback>{getFirstChars(name)}</AvatarFallback>
      </Avatar>

      <span className="text-sm font-medium leading-none mt-2 text-center">{name || "-"}</span>

      {/* <Input type="number" className="mt-4" /> */}
    </div>
  );
};
export default TeamInfo;
