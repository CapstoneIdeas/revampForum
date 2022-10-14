export default function Login(props) {
    return `
<!--<!DOCTYPE html>-->
<!--<html>-->
<!--<head>-->
<!--    <meta charset="UTF-8"/>-->
<!--    <title>Log In</title>-->
<!--</head>-->
<!--<body>-->
<!--<h1>Log In</h1>-->
<!--<form id="login-form">-->
<!--    <label for="username">Username</label>-->
<!--    <input id="username" name="username" type="text">-->
<!--    <label for="password">Password</label>-->
<!--    <input id="password" name="password" type="password">-->
<!--    <input id="login-btn" type="submit" value="Log In">-->
<!--</form>-->
<!--</body>-->
<!--</html>-->
<div id="login-container">

</div>
`
        ;
}

export function LoginEvents() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': GOOGLE_CLIENT_ID,
        'redirect_uri': REDIRECT_URL,
        'response_type': 'token',
        'scope': SCOPES,
        'include_granted_scopes': 'true',
        'state': 'pass-through value'};

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.querySelector("#login-container").appendChild(form);
    form.submit();
}


