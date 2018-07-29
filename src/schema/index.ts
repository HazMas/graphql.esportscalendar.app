import { Ladder } from "./ladder.type"
import { Query } from "./query.type"
import { Game } from "./game.enum";
import { Competition } from "./competition.enum";
import { Player } from "./player.type";
import { Social } from "./social.type";
import { Team } from "./team.type";
import { MatchSchema as Match } from "../domain/match/match.schema";

// makeExecutableSchema({
//     typeDefs: [
//         SchemaDefinition,
//         RootQuery,
//         Author
//     ],
//     resolvers: {},
// });

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