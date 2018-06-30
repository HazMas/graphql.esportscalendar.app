const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  enum GAME {
    LOL
    COD
    CSGO
  }

  enum COMPETITION {
    SUPERLIGA
  }

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
  }

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
  }

  type Social @cacheControl(maxAge: 5000) {
    facebook: String
    twitter: String
    twitch: String
    instagram: String
    youtube: String
  }

  type Player @cacheControl(maxAge: 5000) {
    id: Int
    name: String
    nick: String
    image_url: String
  }

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
  }

  type Query {
    matches(game: GAME! competition: COMPETITION!): [Match]
    match(game: GAME! competition: COMPETITION! matchId: Int!): Match
    teams(game: GAME! competition: COMPETITION!): [Team]
    team(game: GAME! competition: COMPETITION! teamId: Int!): Team
    ladders(game: GAME! competition: COMPETITION!): [Ladder]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema. 
const resolvers = {
  Query: {
    matches: async (_, {game, competition}) => {
        return getList(game, competition, 'matches')
    },
    match: async (_, {game, competition, matchId}) => {
        return getItem(game, competition, matchId, 'match')
    },
    teams: async (_, {game, competition}) => {
        return getList(game, competition, 'teams')
    },
    team: async (_, {game, competition, teamId}) => {
        return getItem(game, competition, teamId, 'team')
    },
    ladders: async (_, {game, competition}) => {
        return getList(game, competition, 'ladder')
    },
  },
  Team: {
    description: async (obj) => {
        return getPropertyOfTeam(obj.id, 'description')
    },
    players: async (obj) => {
        return getPropertyOfTeam(obj.id, 'players')
    },
    social: async (obj) => {
        return getPropertyOfTeam(obj.id, 'social')
    }
  },
  GAME: {
    LOL: 'lol',
    COD: 'cod',
    CSGO: 'csgo'
  },
  COMPETITION: {
    SUPERLIGA: 'superliga'
  }
};

const getList = async (game, competition, path) => {
    const { data: list } = await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/${path}`)
        return list.map(item => {
            return {
                game,
                competition,
                ...item
            }
        })
}

const getItem = async (game, competition, itemId, path) => {
    const { data: item } = await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/${path}/${itemId}`)
        return {
            game,
            competition,
            ...item
        }
}

const getPropertyOfTeam = async (teamId, propertyName) => {
    const team = await getItem('lol', 'superliga', teamId, 'team')
    return team[propertyName]
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
        apiKey: "service:SantiMA10:T0oJf22ydbJvmZGzVLXLRA"
    }, 
    introspection: true,
    cacheControl: true,
    tracing: process.env.NODE_ENV !== 'production'
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});