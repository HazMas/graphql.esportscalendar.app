import Axios from "axios";

import { IMatch } from "../match.interface";

const client = Axios.create({
    baseURL: "https://www.lvp.es/api/superliga/"
});

export const getMatches = (game: string): Promise<IMatch[]> => {
    const url = `${game}/temporada/matches`
    return client
        .get(url)
        .then(({data}) => data.map((match) => matchTransform(match, game)))
}

export const getMatch = (game: string, id: number): Promise<IMatch> => {
    const url = `${game}/temporada/match/${id}`
    return client
        .get(url)
        .then(({data}): IMatch => matchTransform(data, game))
}

const matchTransform = (match: IMatch, game: string): IMatch => {
    return {
        ...match,
        game,
        competition: 'superliga',
    }
}