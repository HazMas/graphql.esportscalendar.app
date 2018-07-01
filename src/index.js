import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolver'

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