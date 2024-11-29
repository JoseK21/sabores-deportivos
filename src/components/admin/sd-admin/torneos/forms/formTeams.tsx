/* eslint-disable @next/next/no-img-element */
"use client";

import { z } from "zod";
import { useState } from "react";
import { deleteApi, postApi } from "@/lib/api";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import useTeamsBySportIdData from "@/hooks/useFetchTeamsBySportIdData";
import { RTournament } from "@/relatedTypes/tournament";
import { Button } from "@/components/ui/button";
import useFetchTeamsByTournamentIdData from "@/hooks/useFetchTeamsByTournamentIdData";

const FormSchemaConfig = z.object({
  teamId: z.string().optional(),
});

export default function FormTeams({ data }: { data: RTournament }) {
  const { teamsBySportId, isLoaded } = useTeamsBySportIdData(data.Sport?.id);

  // TODO - Limpiar storate al cambiar de torneo
  const { teamsTournament, setDataTeamsTournament } = useFetchTeamsByTournamentIdData(data.id);

  const form = useForm<z.infer<typeof FormSchemaConfig>>({
    resolver: zodResolver(FormSchemaConfig),
    defaultValues: { teamId: "" },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchemaConfig>) {
    try {
      setLoading(true);

      const teamId_ = dataForm.teamId;

      const team_ = teamsTournament.find((v) => v.teamId == teamId_);

      if (team_) {
        toast({
          duration: 5000,
          variant: "info",
          title: "Equipo ya agregado!",
          description: `No se agrego el equipo ${team_?.Team?.name}, debido que ya se encuentra en el torneo!`,
        });
      } else {
        const body = { teamId: dataForm.teamId, tournamentId: data?.id };

        const response = await postApi("team-tournament", body);

        if (response.data) {
          console.log("🚀 >>  onSubmit >>  response.data:", response.data);
          setDataTeamsTournament([...teamsTournament, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Equipo no agregado!" : "Nuevo equipo agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el equipo ${response.data?.Team?.name}`,
        });
      }

      // no team

      setLoading(false);
    } catch (error: any) {
      console.error("🚀 >>  onSubmit >>  error:", error);
      setLoading(false);
      toast({
        duration: 7000,
        variant: "destructive",
        title: "Hubo un error! por favor contactar con soporte",
        description: "Error desconocido",
      });
    }
  }

  const onConfirmRemove = async (id: number) => {
    setLoading(true);

    const response = await deleteApi(`team-tournament/${id}`);

    if (response.data) {
      setDataTeamsTournament(teamsTournament.filter((teamTournament) => teamTournament.id !== id));
    }

    toast({
      duration: 7000,
      variant: response.isError ? "destructive" : "success",
      title: response.isError ? "Equipo no eliminado!" : "Equipo eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el equipo ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex items-end gap-4 mb-4">
          <FormField
            name="teamId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Deporte</FormLabel>
                <Select
                  disabled={loading || !isLoaded}
                  defaultValue={field.value ?? undefined}
                  onValueChange={(value) => {
                    field.onChange(value); // Notifica a react-hook-form del cambio
                  }}
                >
                  <FormControl>
                    <SelectTrigger disabled={loading || !isLoaded}>
                      <SelectValue placeholder="Seleccione un equipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teamsBySportId.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading || !isLoaded}>
            <Plus /> Agregar Equipo
          </Button>
        </div>
        <div>
          <strong>Equipos</strong>
          <div className="flex flex-row flex-wrap gap-4 mt-4">
            {teamsTournament?.map((teamTournament) => (
              <Badge key={teamTournament.id} variant="outline" className="flex gap-2 text-sm py-1">
                <X
                  size={16}
                  onClick={() => {
                    if (!(loading || !isLoaded)) {
                      console.log(`REMOVE TEAM ${teamTournament?.Team?.name}`);
                      onConfirmRemove(teamTournament.id);
                    }
                  }}
                />
                <img
                  src={teamTournament?.Team?.logoUrl ?? "/assets/default-team.png"}
                  alt={teamTournament?.Team?.name}
                  className="w-6 h-6"
                />
                {teamTournament?.Team?.name}
              </Badge>
            ))}
            {teamsTournament?.length == 0 && (
              <span className="text-sm text-gray-700">No hay equipos asignados a este torneo!</span>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
