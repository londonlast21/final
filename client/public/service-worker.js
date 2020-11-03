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


self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        let cacheKeeplist = keyList.filter(function(key) {
          return key.indexOf(APP_PREFIX);
        });
        cacheKeeplist.push(CACHE_NAME);
  
        return Promise.all(
          keyList.map(function(key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
});


self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
      caches.match(e.request).then(function (request) {
        if (request) { // if cache is available, respond with cache
          console.log('responding with cache : ' + e.request.url)
          return request
        } else {       // if there are no cache, try fetching request
          console.log('file is not cached, fetching : ' + e.request.url)
          return fetch(e.request)
        }
      })
    )
})