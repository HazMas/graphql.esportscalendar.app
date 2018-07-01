import { gql } from "apollo-server";

export const Team = gql`
type Team @cacheControl(maxAge: 5000) {
    id: Int
    name: String
    image_url: String
    stats_id: Int
    description: String
    social: Social 
    players: [Player]
    game: GAME
    competition: COMPETITION
}`