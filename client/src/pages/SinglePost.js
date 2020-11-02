import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card, Grid, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props){
    const postId = props.match.params.postId;

    //const { user } = useContext(AuthContext);

    console.log(postId);

    const {data = {}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const getPost = data.getPost;


    let postMarkup;
    if(!getPost){
        postMarkup = <p>Loading entry....</p>
    } else {
        const { id, name, location, type, createdAt, username, comments, commentCount} = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column>

                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{name}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                            <Card.Description>
                                <ul>
                                    <li>{type}</li>
                                    <li>{location}</li>
                                    <p>Reviews:{commentCount}</p>
                                </ul>
                            </Card.Description>
                        </Card.Content>
                        <hr/>



                        <Card.Content extra>
                        
                        <Button 
                            as="div"
                            labelPosition="right"
                            onClick={() => console.log('comment on a post')} 
                            >
                                <Button  color="blue">
                                    Leave Review
                                </Button>
                                
                            </Button>
                            {/* {user && user.username === username && (
                                <DeleteButton postId={id} />
                            )} */}
                        </Card.Content>
                    </Card>

                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
    return postMarkup;
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