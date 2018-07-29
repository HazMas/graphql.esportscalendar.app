import { ITeam } from "../team/team.interface";

export interface ILadder {
    id: number
    rank: number
    team: ITeam
    win: number
    loss: number
    draw: number
    streak: number
    diff_rounds: number
    points: number
    game: string
    competition: string
}
