const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const redis = require('redis')

const client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    {
        'auth_pass': process.env.REDIS_KEY,
        'return_buffers': true
    }
).on('error', (err) => console.error('ERR:REDIS:', err));

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  enum GAME {
    LOL
    COD
    CSGO
    CLASH
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
    allMatches: [Match]
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
    allMatches: async () => {
        const competition = 'superliga'
        const path = 'matches'
        const matches = await Promise.all([
            getList('lol', competition, path),
            getList('cod', competition, path),
            getList('csgo', competition, path),
            getList('clash', competition, path)
        ])
        .then((responses) => {
            return [
                ...responses[0],
                ...responses[1],
                ...responses[2],
            ]
        })

        return matches
    },
    matches: async (_, {game, competition}) => {
        return getList(game, competition, 'matches', 60)
    },
    match: async (_, {game, competition, matchId}) => {
        return getItem(game, competition, matchId, 'match', 60)
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
    CSGO: 'csgo',
    CLASH: 'clash',
  },
  COMPETITION: {
    SUPERLIGA: 'superliga'
  }
};

const getList = async (game, competition, path, cacheTime = 600) => {
    let list = JSON.parse(await getAsync(`${game},${competition},${path}`))

    if (!list) {
        list = (await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/${path}`)).data
        client.setex(`${game},${competition},${path}`, cacheTime, JSON.stringify(list));
    }

    return list.map(item => {
        return {
            game,
            competition,
            ...item
        }
    })
}

const getItem = async (game, competition, itemId, path, cacheTime = 600) => {
    let item = JSON.parse(await getAsync(`${game},${competition},${path},${itemId}`))

    if (!item) {
        item = (await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/${path}/${itemId}`)).data
        client.setex(`${game},${competition},${path},${itemId}`, cacheTime, JSON.stringify(item));
    }

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