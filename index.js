const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type Match @cacheControl(maxAge: 60) {
    id: Int
    start_date: String
    round: Int
    team_a: Team
    team_b: Team
    result_a: Int
    result_b: Int
    game: String
    competition: String
  }

  type Team @cacheControl(maxAge: 5000) {
    id: Int
    name: String
    image_url: String
    stats_id: Int
    description: String
    social: Social 
    players: [Player]
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
  }

  type Query {
    matches(game: String competition: String): [Match]
    match(game: String competition: String matchId: Int): Match
    teams(game: String competition: String): [Team]
    team(game: String competition: String teamId: Int): Team
    ladders(game: String competition: String): [Ladder]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema. 
const resolvers = {
  Query: {
    matches: async (_, {game, competition}) => {
        const { data: matches } = await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/matches`)
        return matches.map(match => {
            return {
                game,
                competition,
                ...match
            }
        })
    },
    match: async (_, {game, competition, matchId}) => {
        const { data: match } = await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/match/${matchId}`)
        return {
            game,
            competition,
            ...match
        }
    },
    teams: async (_, {game, competition}) => {
        const { data: teams } = await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/teams`)
        return teams.map(team => {
            return {
                game,
                competition,
                ...team
            }
        })
    },
    team: async (_, {game, competition, teamId}) => {
        const { data: team } = await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/team/${teamId}`)
        return {
            game,
            competition,
            ...team
        }
    },
    ladders: async (_, {game, competition}) => {
        const { data: ladders } = await axios.get(`http://www.lvp.es/api/${competition}/${game}/temporada/ladder`)
        return ladders.map(ladder => {
            return {
                game,
                competition,
                ...ladder
            }
        })
    },
  },
  Team: {
    description: async (obj, args, context, info) => {
        let { data: team } = await axios.get(`http://www.lvp.es/api/superliga/lol/temporada/team/${obj.id}`)
        return team.description
    },
    players: async (obj) => {
        let { data: team } = await axios.get(`http://www.lvp.es/api/superliga/lol/temporada/team/${obj.id}`)
        return team.players
    },
    social: async (obj) => {
        let { data: team } = await axios.get(`http://www.lvp.es/api/superliga/lol/temporada/team/${obj.id}`)
        return team.social
    }
  }
};

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
    tracing: true,
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});