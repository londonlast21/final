import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';


import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm(){


    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        name: '',
        location: '',
        type: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
          });
          data.getPosts = [result.data.createPost, ...data.getPosts];
          proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
          values.name = '';
          values.location = '';
          values.type = '';
        }
      });

    function createPostCallback(){
        createPost();
        window.location.reload();
    }
    

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Add a Provider</h2>
            <Form.Field>

                <Form.Input
                    placeholder="Sample medical provider"
                    name="name"
                    onChange={onChange}
                    value={values.name}
                    error={error ? true : false}
                    />

                <Form.Input
                    placeholder="Provider location"
                    name="location"
                    onChange={onChange}
                    value={values.location}
                    error={error ? true : false}
                    />

                <Form.Input
                    placeholder="Type of professional/specialty"
                    name="type"
                    onChange={onChange}
                    value={values.type}
                    error={error ? true : false}
                    />
                
                <Button type="submit" color="instagram" >
                    Submit
                </Button>
            </Form.Field>
        </Form>
        
        
        {error && (
            <div className="ui error message" style={{ margin: 10 }}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
    </>
    );
    

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