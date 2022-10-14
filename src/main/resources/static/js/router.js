import Home, {HomeEvents} from "./views/Home.js";
import About, {AboutEvents} from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login, {LoginEvents} from "./views/Login.js";
// import LoginEvent from "./auth.js";
import Register, {RegisterEvent} from "./views/Register.js"
import Logout, {LogoutEvents} from "./views/Logout.js";
import PostIndex, {postSetup} from "./views/PostIndex.js";
import prepareUserHTML, {prepareUserJS} from "./views/User.js"
/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
            viewEvent: HomeEvents
        },
        '/logout': {
            returnView: Logout,
            state: {},
            uri: '/',
            title: 'Logout',
            viewEvent: LogoutEvents
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvents
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
            viewEvent: AboutEvents
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
        },
        '/user': {
            returnView: prepareUserHTML,
            state: {
                me: '/api/users/me'
            },
            uri: '/user',
            title: 'User Info',
            viewEvent: prepareUserJS
        },
        '/posts': {
            returnView: PostIndex,
            state: {
                posts: '/api/posts'
            },
            uri: '/posts',
            title: 'All Posts',
            viewEvent: postSetup
        }
    };
    // if we see a URI with index.html then interpret that as a route for /
    // if(URI.indexOf("index.html") > -1) {
    //     URI = "/";
    // }
    return routes[URI];
}