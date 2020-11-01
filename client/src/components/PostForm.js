import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';

function PostForm(){

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        name: '',
        location: '',
        type: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(_, result){
            console.log(result);
            values.name = '';
            values.location = '';
            values.type = '';

        }
    });

    function createPostCallback(){
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Add a Provider</h2>
            <Form.Field>

                <Form.Input
                    placeholder="Sample medical provider"
                    name="name"
                    onChange={onChange}
                    value={values.name}
                    />

                <Form.Input
                    placeholder="Provider location"
                    name="location"
                    onChange={onChange}
                    value={values.location}
                    />

                <Form.Input
                    placeholder="Type of professional/specialty"
                    name="type"
                    onChange={onChange}
                    value={values.type}
                    />
                
                <Button type="submit" color="instagram">
                    Submit
                </Button>


            </Form.Field>
        </Form>
    )

}

const CREATE_POST_MUTATION =gql`
mutation createPost(
    $name: String!,
    $location: String!,
    $type: String!
){
createPost(name: $name,
    location: $location,
    type: $type
){
    id name location type username createdAt 
    comments{
        id createdAt username body
    }
    commentCount
    }
}
` 

export default PostForm;