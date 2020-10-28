const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODBURI } = require('./config');


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/transapp', 
    { useNewUrlParser: true }, 
    { useFindAndModify: false } )
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 3003 });
    })

    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });