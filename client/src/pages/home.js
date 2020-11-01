import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';


function Home() {
    const { user } = useContext(AuthContext)
    
    const { data = {}} = useQuery(FETCH_POSTS_QUERY);

    const post = data.getPosts;
    

    console.log(post);
   

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>TSafety Directory</h1>
            </Grid.Row>



            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {(
                    post && post.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 10 }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    )) 
                )} 
             </Grid.Row>
        </Grid>
    );     
}

const FETCH_POSTS_QUERY = gql`

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

export default Home;