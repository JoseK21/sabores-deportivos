import { create } from "zustand";

import { User } from "@/types/user";
import { Prize } from "@/types/prize";
import { Product } from "@/types/product";
import { Business } from "@/types/business";
import { ProductType } from "@/types/product-type";

import { REvent } from "@/relatedTypes/event";
import { RTeam } from "@/relatedTypes/team";
import { RTournament } from "@/relatedTypes/tournament";
import { RLeague } from "@/relatedTypes/league";
import { RSport } from "@/relatedTypes/sport";
import { RTeamTournament } from "@/relatedTypes/teamTournament";
import { RTeamLeague } from "@/relatedTypes/teamLeague";
import { UserPoint } from "@/types/user-points";

export const useAdminsStore = create<{
  admins: User[];
  error: Error | null;
  setData: (newData: User[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  admins: [],
  setError: (error) => set({ error }),
  setData: (newData) => set({ admins: newData, error: null }),
}));

export const useProductTypesStore = create<{
  productTypes: ProductType[];
  error: Error | null;
  setData: (newData: ProductType[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  productTypes: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ productTypes: data, error: null }),
}));

export const useProductsStore = create<{
  products: Product[];
  error: Error | null;
  setData: (newData: Product[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  products: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ products: data, error: null }),
}));

export const usePrizesStore = create<{
  prizes: Prize[];
  error: Error | null;
  setData: (newData: Prize[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  prizes: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ prizes: data, error: null }),
}));

export const useBusinessStore = create<{
  business: Business;
  error: Error | null;
  setData: (newData: Business) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  business: {} as Business,
  setError: (error) => set({ error }),
  setData: (data) => set({ business: data, error: null }),
}));

export const useBusinessesStore = create<{
  businesses: Business[];
  error: Error | null;
  setData: (newData: Business[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  businesses: [],
  error: null,
  setData: (newData) => set({ businesses: newData, error: null }),
  setError: (error) => set({ error }),
}));

export const useLeaguesStore = create<{
  leagues: RLeague[];
  error: Error | null;
  setData: (newData: RLeague[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  leagues: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ leagues: data, error: null }),
}));

export const useSportsStore = create<{
  sports: RSport[];
  error: Error | null;
  setData: (newData: RSport[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  sports: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ sports: data, error: null }),
}));

export const useTournamentsStore = create<{
  tournaments: RTournament[];
  error: Error | null;
  setData: (newData: RTournament[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  tournaments: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ tournaments: data, error: null }),
}));

export const useEventsStore = create<{
  events: REvent[];
  error: Error | null;
  setData: (newData: REvent[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  events: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ events: data, error: null }),
}));

export const useTeamsStore = create<{
  teams: RTeam[];
  error: Error | null;
  setData: (newData: RTeam[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  teams: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ teams: data, error: null }),
}));

export const useTeamsBySportIdStore = create<{
  teamsBySportId: RTeam[];
  errorBySportId: Error | null;
  setDataBySportId: (newData: RTeam[]) => void;
  setErrorBySportId: (errorBySportId: Error) => void;
}>((set) => ({
  errorBySportId: null,
  teamsBySportId: [],
  setErrorBySportId: (errorBySportId) => set({ errorBySportId }),
  setDataBySportId: (data) => set({ teamsBySportId: data, errorBySportId: null }),
}));

export const useTeamsTournamentStore = create<{
  teamsTournament: RTeamTournament[];
  errorTeamsTournament: Error | null;
  setDataTeamsTournament: (newData: RTeamTournament[]) => void;
  setErrorTeamsTournament: (errorTeamsTournament: Error) => void;
}>((set) => ({
  errorTeamsTournament: null,
  teamsTournament: [],
  setErrorTeamsTournament: (errorTeamsTournament) => set({ errorTeamsTournament }),
  setDataTeamsTournament: (data) => set({ teamsTournament: data, errorTeamsTournament: null }),
}));

export const useTeamsLeagueStore = create<{
  teamsLeague: RTeamLeague[];
  errorTeamsLeague: Error | null;
  setDataTeamsLeague: (newData: RTeamLeague[]) => void;
  setErrorTeamsLeague: (errorTeamsLeague: Error) => void;
}>((set) => ({
  errorTeamsLeague: null,
  teamsLeague: [],
  setErrorTeamsLeague: (errorTeamsLeague) => set({ errorTeamsLeague }),
  setDataTeamsLeague: (data) => set({ teamsLeague: data, errorTeamsLeague: null }),
}));

//
export const useUserPointsStore = create<{
  userPoint: UserPoint;
  errorUserPoint: Error | null;
  setDataUserPoint: (newData: UserPoint) => void;
  setErrorUserPoint: (errorUserPoint: Error) => void;
}>((set) => ({
  errorUserPoint: null,
  userPoint: {} as UserPoint,
  setErrorUserPoint: (errorUserPoint) => set({ errorUserPoint }),
  setDataUserPoint: (data) => set({ userPoint: data, errorUserPoint: null }),
}));
