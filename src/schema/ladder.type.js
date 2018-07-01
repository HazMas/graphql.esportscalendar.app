const Game = require('./game.enum')
const Competition = require('./competition.enum')

export const Ladder = `
type Ladder @cacheControl(maxAge: 60) {
    id: Int
    rank: Int
    team: Team
    win: Int
    loss: Int
    draw: Int
    streak: Int
    diff_rounds: Int
    points: Int
    game: GAME
    competition: COMPETITION
}`
