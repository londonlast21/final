import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({ post: { name, type, createdAt, id, username, commentCount, location }}){
    
    function commentOnPost(){
        console.log("comment")
    }
    return (
        <Card fluid>
              <Card.Content>
                <Card.Header as={Link} to={`/posts/${id}`}>{name}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    <ul>
                        <li>{type}</li>
                        <li>{location}</li>
                        
                    
                    </ul>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <p>Reviews:{commentCount}</p>
            <Button color='instagram' onClick={commentOnPost}>Leave Review</Button>
          
            </Card.Content>
        </Card>
    )

}

export default PostCard;