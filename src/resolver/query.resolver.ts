import { getList, getItem } from "../util/util";
import { matchesLvpResolver, matchLvpResolver, allMatchesLvpResolver } from "../domain/match/lvp/match.lvp.resolver";
import { teamsLvpResolver, teamLvpResolver } from "../domain/team/lvp/team.lvp.resolver";

export const Query = {
    allMatches: async () => {
        return allMatchesLvpResolver()
    },
    matches: async (_, {game}) => {
        return matchesLvpResolver(game)
    },
    match: async (_, {game, matchId}) => {
        return matchLvpResolver(game, matchId)
    },
    teams: async (_, {game}) => {
        return teamsLvpResolver(game)
    },
    team: async (_, {game, teamId}) => {
        return teamLvpResolver(game, teamId)
    },
    ladders: async (_, {game, competition}) => {
        return getList(game, competition, 'ladder')
    }
}