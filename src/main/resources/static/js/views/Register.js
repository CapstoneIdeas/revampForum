import createView from "../createView.js"
import {getHeaders, isLoggedIn} from "../auth.js";
const BASE_URI = `${BACKEND_HOST}/api/users/create`;
export default function Register(props) {
    if(isLoggedIn()){
        createView("/")
        return;
    }
    return `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <title>Register</title>
            </head>
            <body>
                <h1>Register</h1>
                <a href="/login" data-link>Go To login</a>
                <form id="register-form">
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text"/>
                    <br>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email">
                    <br>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password"/>
                    <br>
                    <button id="register-btn" type="button">Register</button>
                </form>
            </body>
        </html>
`;
}

export function RegisterEvent(){
    const registerButton = document.querySelector("#register-btn");
    registerButton.addEventListener("click", function(event) {
        const usernameField = document.querySelector("#username");
        const emailField = document.querySelector("#email");
        const passwordField = document.querySelector("#password");
        let newUser = {
            userName: usernameField.value,
            email: emailField.value,
            password: passwordField.value
        }
        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newUser)
        }
        console.log("am I logged in ? " + isLoggedIn());
        console.log(newUser);
        fetch(BASE_URI, request)
            .then(response => {
                console.log(response.status);
                createView("/");
            })

    });
}