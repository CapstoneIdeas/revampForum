import fetchData from "./fetchData.js";
import createView from "./createView.js";
import {showNotification} from "./messaging.js";
/**
 * Adds a login event to allow the user to initially obtain a new OAuth2.0 token
 * On a successful response, sets the tokens into storage and redirects to the root
 */
export function setLoggedInUserInfo() {
    const request = {
        method: "GET",
        headers: getHeaders()
    }
    const url = BACKEND_HOST_URl + "/api/users/authinfo";
    fetch(url, request)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
        window.localStorage.setItem("user", JSON.stringify(data));
        createView("/");
    });
}

export function checkForLoginTokens(url) {
    // console.log(url);
    // access_token is given back from spring after #
    let parts = url.split("#");
    if(parts.length < 2)
        return false;

    parts = parts[1].split("&");
    let tokens = [];
    tokens['access_token'] = "";
    for (let i = 0; i < parts.length; i++) {
        const pair = parts[i].split("=");
        console.log(pair);
        if(pair.length > 1 && (pair[0] === "access_token" || pair[0] === "refresh_token"))
            tokens[pair[0]] = pair[1];
    }
    console.log(tokens['access_token']);
    // console.log(tokens);
    if(tokens['access_token'] === "")
        return false;

    setTokens(tokens);
    return true;
}

export default function addLoginEvent() {
    console.log("entered addLoginEvent")
    document.querySelector("#login-btn").addEventListener("click", function () {
        let obj = {
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
            grant_type: 'password'
        }
        console.log("got to login event")
        // TODO: these are the only request params /oauth/token accepts in Spring Security
        // TODO: need to possibly implement a random bit handshake w/ SHA256 on the password before sending
        //      -> Alternatively, encrypt the entire request body
        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('rest-blog-client:secret')
            },
            body: `grant_type=${obj.grant_type}&username=${obj.username}&password=${obj.password}&client_id=rest-blog-client`
        };

        fetchData(
            {
                route: `/oauth/token`
            }, request).then((data) => {
                // if login fails, then display a message and stay on page
                if(data.route.error) {
                    showNotification("Failed to log in: " + data.route.error, "warning");
                    return;
                }
                setTokens(data);
                createView("/");
            }).catch((error) => {
                // this does not get called on a 401
            });
    });
}
/**
 * Gets the Authorization header needed for making requests to protected endpoints
 * This function should be used only after the user is logged in
 * @returns {{Authorization: string, "Content-Type": string}|{"Content-Type": string}}
 */
export function getHeaders() {
    const token = localStorage.getItem("access_token");
    return token
        ? {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${token}`}
        : {'Content-Type': 'application/json'};
}

/**
 * Attempts to set the access and refresh tokens needs to authenticate and authorize the client and user
 * @param responseData
 */
function setTokens(responseData) {
    if (responseData['access_token']) {
        localStorage.setItem("access_token", responseData['access_token']);
        console.log("Access token set");
    }
    if (responseData['refresh_token']) {
        localStorage.setItem("refresh_token", responseData['refresh_token']);
        console.log("Refresh token set")
    }
}

export function isLoggedIn() {
    if(localStorage.getItem('access_token')) {
        return true;
    }
    return false;
}

//  returns an object with user_name and authority from the access_token
// export function getUser() {
//     const accessToken = localStorage.getItem("access_token");
//     if(!accessToken) {
//         return false;
//     }
//     const parts = accessToken.split('.');
//     const payload = parts[1];
//     const decodedPayload = atob(payload);
//     const payloadObject = JSON.parse(decodedPayload);
//     return {
//         userName: payloadObject.user_name,
//         role: payloadObject.authorities[0]
//     };
// }
//
// export function getUserRole() {
//     const accessToken = localStorage.getItem("access_token");
//     if(!accessToken) {
//         return false;
//     }
//     const parts = accessToken.split('.');
//     const payload = parts[1];
//     const decodedPayload = atob(payload);
//     const payloadObject = JSON.parse(decodedPayload);
//     return payloadObject.authorities[0];
// }
export function getUser() {
    const accessToken = localStorage.getItem("access_token");
    if(!accessToken) {
        return false;
    }
    return JSON.parse(window.localStorage.getItem("user"));
}

export async function removeStaleTokens() {
    if(SKIP_STALE_TOKEN_CHECK) {
        return;
    }
    console.log("Removing stale tokens...");
    const request = {
        method: 'GET',
        headers: getHeaders()
    };
    await fetch(`/api/users/authinfo`, request)
        .then((response) => {
            // if fetch error then you might be using stale tokens
            if (response.status === 401) {
                window.localStorage.clear();
                console.log("Tokens removed (if any were there).")
            }
        }).catch(error => {
            console.log("FETCH ERROR: " + error);
        });
}