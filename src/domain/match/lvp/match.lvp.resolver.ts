import { getMatches, getMatch } from "./match.lvp.api";

export const allMatchesLvpResolver = async () => {
    return Promise.all([
        getMatches('lol'),
        getMatches('csgo'),
        getMatches('clash'),
        getMatches('cod')
    ])
    .then((responses) => {
        return [
            ...responses[0],
            ...responses[1],
            ...responses[2],
            ...responses[3]
        ]
    })
}

export const matchesLvpResolver = (game: string) => {
    return getMatches(game)
}

export const matchLvpResolver = (game: string, id: number) => {
    return getMatch(game, id)
}