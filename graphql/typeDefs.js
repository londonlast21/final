const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        name: String!
        type: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!


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
        getPost(postId: ID!): Post
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(name:String!, type: String!, location: String!): Post
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!

    }
`;