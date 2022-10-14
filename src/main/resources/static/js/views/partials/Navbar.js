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
            <a class="jalopy-nav" href="/user" id="user" data-link>User</a>
            <a class="jalopy-nav" href="/logout" data-link>Logout</a>`;
    } else {
        html += `<a class="jalopy-nav" href="/login" data-link>Login</a>`;
    }
    html += ` </nav>`;
        return html;
    }