const APP_PREFIX = 'TSafetyApp-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "../src/components/DeleteButton.js",
    "../src/components/Navbar.js",
    "../src/components/PostCard.js",
    "../src/components/PostForm.js",
    "../src/context/auth.js",
    "../src/pages/home.js",
    "../src/pages/login.js",
    "../src/pages/signup.js",
    "../src/pages/SinglePost.js",
    "../src/util/AuthRoute.js",
    "../src/util/graphql.js",
    "../src/util/hooks.js",
    "../src/ApolloProvider",
    "../src/App.css",
    "../src/App.js",
    "../src/index.css",
    "../src/index.js",
    "../.././graphql/resolvers/comments.js",
    "../.././graphql/resolvers/index.js",
    "../.././graphql/resolvers/posts.js",
    "../.././graphql/resolvers/users.js",
    "../.././graphql/typeDefs.js",
    "../.././models/Post.js",
    "../.././models/User.js",
    "../.././util/checkAuth.js",
    "../.././util/validators.js",
    "../.././index.js"



];


self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keyList) {
        let cacheKeeplist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX);
        })

