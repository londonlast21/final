import React from 'react';
import gql from 'graphql-tag';

function SinglePost(props){
    const postId = props.match.params.postId;


}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id name location type createdAt username commentCount
            comments{
                id username body createdAt
            }
        }
    }
`

export default SinglePost