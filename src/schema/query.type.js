const Match = require('./match.type')
const Team = require('./team.type')
const Ladder = require('./ladder.type')
const Game = require('./game.enum')
const Competition = require('./competition.enum')

export const Query = `
type Query {
    allMatches: [Match]
    matches(game: GAME! competition: COMPETITION!): [Match]
    match(game: GAME! competition: COMPETITION! matchId: Int!): Match
    teams(game: GAME! competition: COMPETITION!): [Team]
    team(game: GAME! competition: COMPETITION! teamId: Int!): Team
    ladders(game: GAME! competition: COMPETITION!): [Ladder]
}`
