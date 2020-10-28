const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB_URI } = require('./config');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(
    MONGODB_URI || 'mongodb://localhost/transapp', 
    { useNewUrlParser: true }, 
    { useUnifiedTopolgy: true },
    { useFindAndModify: false } )
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 3003 });
    })

    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });