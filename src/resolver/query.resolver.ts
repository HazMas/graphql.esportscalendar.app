import { getList, getItem } from "../util/util";

export const Query = {
    allMatches: async () => {
        const competition = 'superliga'
        const path = 'matches'
        const matches = await Promise.all([
            getList('lol', competition, path),
            getList('cod', competition, path),
            getList('csgo', competition, path),
            getList('clash', competition, path)
        ])
        .then((responses) => {
            return [
                ...responses[0],
                ...responses[1],
                ...responses[2],
            ]
        })

        return matches
    },
    matches: async (_, {game, competition}) => {
        return getList(game, competition, 'matches', 60)
    },
    match: async (_, {game, competition, matchId}) => {
        return getItem(game, competition, matchId, 'match', 60)
    },
    teams: async (_, {game, competition}) => {
        return getList(game, competition, 'teams')
    },
    team: async (_, {game, competition, teamId}) => {
        return getItem(game, competition, teamId, 'team')
    },
    ladders: async (_, {game, competition}) => {
        return getList(game, competition, 'ladder')
    }
}