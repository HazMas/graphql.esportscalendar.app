import { gql } from "apollo-server";

export const Query = gql`
type Query {
    allMatches: [Match]
    matches(game: GAME! competition: COMPETITION!): [Match]
    match(game: GAME! competition: COMPETITION! matchId: Int!): Match
    teams(game: GAME! competition: COMPETITION!): [Team]
    team(game: GAME! competition: COMPETITION! teamId: Int!): Team
    ladders(game: GAME! competition: COMPETITION!): [Ladder]
}`
