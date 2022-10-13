import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    const loggedIn = isLoggedIn();
    let html = `
        <nav>
            <a class="jalopy-nav" href="/" data-link>Home</a>`;
    html += `<a class="jalopy-nav" href="/about" data-link>About</a>`;
    if(loggedIn) {
        html += `
            <a class="jalopy-nav" href="/posts" data-link>Posts</a>
            <a class="jalopy-nav" href="/logout" data-link>Logout</a>
            <a class="jalopy-nav" href="/users" id="user" data-link>User Info</a>`;
    } else {
        html += `<a class="jalopy-nav" href="/login" data-link>Login</a>
                <a class="jalopy-nav" href="/register" data-link>Register</a>`;
    }
    html += ` </nav>`;
        return html;
    }