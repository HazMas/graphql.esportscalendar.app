const Game = require('./game.enum')
const Competition = require('./competition.enum')
const Social = require('./social.type')
const Player = require('./Player.type')

export const Team = `
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