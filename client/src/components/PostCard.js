import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

function PostCard({ post: { name, type, createdAt, id, username, commentCount, location }}){
    
    return (
        <Card>
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    <ul>
                        <li>{type}</li>
                        <li>{location}</li>
                        <li>Added by {username}</li>
                        <li>{commentCount}</li>
                    
                    </ul>
                </Card.Description>
            </Card.Content>
        </Card>
    )

}

export default PostCard;