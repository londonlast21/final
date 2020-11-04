const { ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
//const { MONGODB_URI } = process.env.MONGODB_URI;

const path = require('path');


const express = require('express');

const app = express();


const PORT = process.env.PORT || 3003;

const server = new ApolloServer({
    typeDefs,
    resolvers,
   
    
    context: ({ req }) => ({ req })
});

server.applyMiddleware({
    app
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/transapp', 
    { useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true,
    useFindAndModify: false } )
    .then(() => {
        console.log('MongoDB Connected');
        return app.listen({ port: PORT });
    })

    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })

    .catch(err => {
        console.error(err)
    })