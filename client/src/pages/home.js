import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';

import { FETCH_POSTS_QUERY } from '../util/graphql';


function Home() {

    const { user } = useContext(AuthContext);
    
    
    const {data = {}} = useQuery(FETCH_POSTS_QUERY);

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
                    <Transition.Group>
                    {post && post.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 10 }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))} 
                    </Transition.Group>
                )} 
             </Grid.Row>
        </Grid>
    );     
}



export default Home;