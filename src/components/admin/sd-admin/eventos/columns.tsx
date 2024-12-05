/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { REvent } from "@/relatedTypes/event";
import { EVENT_STATUS } from "@/app/constants";
import { getShortDateTime } from "@/utils/date";

export const columns: ColumnDef<REvent>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
    cell: ({ row }) => <span>{row.original.title || "-"}</span>,
  },
  {
    accessorKey: "math",
    header: "Encuentro",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <span>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <img
                src={data?.HomeTeam?.logoUrl ?? "/assets/default-team.png"}
                alt={data?.HomeTeam?.name}
                className="w-7 h-7"
              />
              {/* <span>{data?.HomeTeam?.name}</span> */}
            </div>
            <strong>VS</strong>
            <div className="flex gap-2 items-center flex-row-reverse">
              <img
                src={data?.AwayTeam?.logoUrl ?? "/assets/default-team.png"}
                alt={data?.AwayTeam?.name}
                className="w-7 h-7"
              />
              {/* <span>{data?.AwayTeam?.name}</span> */}
            </div>
          </div>
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const statusLabel = EVENT_STATUS[row.original.status] || "-";

      return <span>{statusLabel}</span>;
    },
  },
  {
    accessorKey: "dateTime",
    header: "Fecha & Hora",
    cell: ({ row }) => <span>{getShortDateTime(row.original.dateTime)}</span>,
  },
  {
    accessorKey: "tournamentOrLeague",
    header: "Torneo/Liga",
    cell: ({ row }) => {
      const { tournamentId, Tournament, leagueId, League } = row.original;
      let label = "-";

      if (tournamentId) {
        label = `T: ${Tournament?.name ?? "n/a"}`;
      } else if (leagueId) {
        label = `L: ${League?.name ?? "n/a"}`;
      }

      return <span>{label}</span>;
    },
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
