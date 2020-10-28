const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        name: String!
        type: String!
        username: String!
        createdAt: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(name:String!, type: String!, location: STring!): Post
        deletePost(postId: ID!): String!

    }
`;