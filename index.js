const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB_URI } = require('./config');


var port = process.env.PORT || 3003;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/transapp', 
    { useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true,
    useFindAndModify: false } )
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 3003 });
    })

    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });