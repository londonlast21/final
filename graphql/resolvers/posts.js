const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');
const { AuthenticationError, UserInputError } = require('apollo-server');

const { validatePostInput } = require('../../util/validators');

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find().sort({ createdAt: -1 });
                console.log(posts);
                return posts;
            } catch(err) {
                throw new Error(err);
            }

        },
        async getPost(_, { postId }){
            try{
            const post = await Post.findById(postId);
            if(post){
                return post;
            } else {
                throw new Error('Post not found')
            }
          } catch(err){
            throw new Error(err)
          }
        }
    },


    Mutation: {

        async createPost(
            _,
            { name, location, type }){

            const { valid, errors } = validatePostInput(name, location, type);

             const user = checkAuth(context);
             console.log(user);

             // errors to throw if input errors
             if(!valid){
                 throw new UserInputError('Errors', { errors });
             }

             const newPost = new Post({
                 name,
                 type,
                 location,
                 username: user.username,
                 user: user.id,
                 createdAt: new Date().toISOString()
            });
            const post = await newPost.save();

            return post;
        },

        async deletePost(_, { postId }, context){
            const user = checkAuth(context);

            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}