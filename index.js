const { ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
//const { MONGODB_URI } = process.env.MONGODB_URI;


const express = require('express');

const app = express();


const PORT = process.env.PORT || 3003;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // introspection: true,
    // playground: true,
    
    context: ({ req }) => ({ req })
});

server.applyMiddleware({
    app
});

app.use(express.static(path.join(__dirname, "../client/build")));

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