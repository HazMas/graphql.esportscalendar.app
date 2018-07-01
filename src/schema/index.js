import { Ladder } from "./ladder.type"
import { Match } from "./match.type"
import { Query } from "./query.type"
import { Game } from "./game.enum";
import { Competition } from "./competition.enum";
import { Player } from "./Player.type";
import { Social } from "./social.type";
import { Team } from "./team.type";

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