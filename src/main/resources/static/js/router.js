// import Home, {HomeEvents} from "./views/Home.js";
import About, {AboutEvents} from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login, {LoginEvents} from "./views/Login.js";
import Logout, {LogoutEvents} from "./views/Logout.js";
import PostIndex, {postSetup} from "./views/PostIndex.js";
import prepareUserHTML, {blogSetup} from "./views/User.js"
/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: PostIndex,
            state: {
                posts: '/api/posts'
            },
            uri: '/',
            title: 'Home',
            viewEvent: postSetup
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvents
        },
        '/logout': {
            returnView: Logout,
            state: {},
            uri: '/',
            title: 'Logout',
            viewEvent: LogoutEvents
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
            viewEvent: AboutEvents
        },
        '/user': {
            returnView: prepareUserHTML,
            state: {
                user: '/api/user',
                posts: '/api/posts'
            },
            uri: '/user',
            title: 'User Info',
            viewEvent: blogSetup
        },
        '/posts': {
            returnView: PostIndex,
            state: {
                posts: '/api/posts'
            },
            uri: '/posts',
            title: 'All Posts',
            viewEvent: postSetup
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        }
    };
    // if we see a URI with index.html then interpret that as a route for /
    // if(URI.indexOf("index.html") > -1) {
    //     URI = "/";
    // }
    return routes[URI];
}