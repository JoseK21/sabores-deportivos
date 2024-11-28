export type Team = {
  id: string;
  name: string;
  abbr: string;
  logoUrl: string;
  colors: string[];
};


// model Team {
//   id         String   @id @default(cuid())
//   name       String
//   abbrName   String
//   logoUrl    String
//   colors     String[]
//   leagueId   String
//   createdAt  DateTime @default(now()) @map("created_at")
//   updatedAt  DateTime @updatedAt @map("updated_at")
//   awayEvents Event[]  @relation("awayTeamEvents")
//   homeEvents Event[]  @relation("homeTeamEvents")
//   League     League   @relation(fields: [leagueId], references: [id])

//   @@unique([leagueId, name])
// }