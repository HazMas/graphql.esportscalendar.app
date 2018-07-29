import { gql } from "apollo-server";

export const Social = gql`
type Social @cacheControl(maxAge: 5000) {
    facebook: String
    twitter: String
    twitch: String
    instagram: String
    youtube: String
}`