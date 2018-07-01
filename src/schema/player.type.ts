import { gql } from "apollo-server";

export const Player = gql`
type Player @cacheControl(maxAge: 5000) {
    id: Int
    name: String
    nick: String
    image_url: String
}`