import { matchesLvpResolver, matchLvpResolver, allMatchesLvpResolver } from "../match/lvp/match.lvp.resolver";
import { teamsLvpResolver, teamLvpResolver } from "../team/lvp/team.lvp.resolver";
import { ladderLvpResolver } from "../ladder/lvp/ladder.lvp.resolver";

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
    ladders: async (_, {game}) => {
        return ladderLvpResolver(game)
    }
}