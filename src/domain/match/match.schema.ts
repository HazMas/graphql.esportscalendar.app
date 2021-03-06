import { gql } from "apollo-server";

export const Match = gql`
type Match @cacheControl(maxAge: 60) {
    id: Int
    start_date: String
    round: Int
    team_a: Team
    team_b: Team
    result_a: Int
    result_b: Int
    game: GAME
    competition: COMPETITION
    status: String
}`