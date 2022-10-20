import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    const loggedIn = isLoggedIn();
     const userId = JSON.parse(localStorage.getItem('user'));
    let html = `
        <nav>
            <a class="jalopy-nav" href="/" data-link>Home</a>`;
    html += `<a class="jalopy-nav" href="/about" data-link>About</a>`;
    if(loggedIn) {
        html += `
           
            <a class="jalopy-nav" href="/user" id="user" data-user-id="${userId.id}" data-link>User</a>
            <a class="jalopy-nav" href="/logout" data-link>Logout</a>`;
    } else {
        html += `<a class="jalopy-nav" href="/login" data-link>Login</a>`;
    }
    html += ` </nav>`;
        return html;
    }
