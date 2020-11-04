const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const express = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
//const { MONGODB_URI } = process.env.MONGODB_URI;


const PORT = process.env.PORT || 3003;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req }) => ({ req })
});


const app = express();
server.applyMiddleware({ app });

app.listen({ PORT });

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/transapp', 
    { useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true,
    useFindAndModify: false } )
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })

    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })

    .catch(err => {
        console.error(err)
    })