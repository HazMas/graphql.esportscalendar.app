import { Game } from "./game/game.enum";
import { Competition } from "./competition/competition.enum";
import { Player } from "./player/player.schema";
import { Social } from "./social/social.schema";
import { Team } from "./team/team.schema";
import { Ladder } from "./ladder/ladder.schema";
import { Query } from "./query/query.schema";
import { Match } from "./match/match.schema";

export const typeDefs = [
    Game,
    Competition,
    Player,
    Social,
    Team,
    Ladder,
    Match,
    Query
]