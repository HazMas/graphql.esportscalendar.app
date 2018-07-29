import { ITeam } from "../team/team.interface";

export interface IMatch {
  id: string;
  team_a: ITeam;
  team_b: ITeam;
  start_date: string;
  round: number;
  result_a: number;
  result_b: number;
  game: string;
  competition: string;
  status: string;
}
