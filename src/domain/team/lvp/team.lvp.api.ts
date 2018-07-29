import Axios from "axios";
import { ITeam } from "../team.interface";

const client = Axios.create({
    baseURL: "https://www.lvp.es/api/superliga/"
});

export const getTeams = (game: string) => {
    const url = `${game}/temporada/teams`
    return client
        .get(url)
        .then(({data}) => data.map((team) => teamTransform(team, game)))
}

export const getTeam = (game: string, id: number) => {
    const url = `${game}/temporada/team/${id}`
    return client
        .get(url)
        .then(({data}) => data.map((team) => teamTransform(team, game)))
}

const teamTransform = (team: ITeam, game: string): ITeam => {
    return {
        ...team,
        game,
        competition: 'superliga'
    }
}