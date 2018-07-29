import { gql } from "apollo-server";

export interface ITeam {
    id: number
    name: String
    image_url: String
    stats_id: number
    description: String
    //social: Social 
    //players: [Player]
    game: String
    competition: String
}