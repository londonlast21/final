import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`

    {
        getPosts {
        id
        name
        type
        location
        username
        createdAt
        commentCount
        comments{
            id 
            username 
            createdAt 
            body
        }
    }

}
`;
