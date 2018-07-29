import { getList, getItem } from "../util/util";
import { matchesLvpResolver, matchLvpResolver, allMatchesLvpResolver } from "../domain/match/lvp/match.lvp.resolver";

export const Query = {
    allMatches: async () => {
        return allMatchesLvpResolver()
    },
    matches: async (_, {game, competition}) => {
        return matchesLvpResolver(game)
    },
    match: async (_, {game, competition, matchId}) => {
        return matchLvpResolver(game, matchId)
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