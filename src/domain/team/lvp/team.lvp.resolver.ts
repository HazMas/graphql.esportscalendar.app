import { getTeam, getTeams } from "./team.lvp.api";

export const teamsLvpResolver = (game: string) => {
    return getTeams(game)
}

export const teamLvpResolver = (game: string, id: number) => {
    return getTeam(game, id)
}