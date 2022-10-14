import CreateView from "../createView.js"
export default function prepareUserHTML(props) {
    return `
        <h1>User Info</h1>
        
    `;
}
function createPostHTML(user) {
    let html = `
        <table class="table">
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
        </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < user.posts.length; i++) {
        const post = user.posts[i];
        html += `<tr>
            <td>${post.title}</td>
            <td>${post.content}</td>
            </tr>`;
    }
    html += `
        </tbody>
        </table>`;
    return html;
}


// PASSWORD HANDLER PRIOR TO GOOGLE LOGIN
// export function prepareUserJS() {
//     doTogglePasswordHandler();
//     doSavePasswordHandler();
// }
// function doSavePasswordHandler() {
//     const button = document.querySelector("#updatePassword");
//     button.addEventListener("click", function(event) {
//         const oldPasswordField = document.querySelector('#oldpassword');
//         const newPasswordField = document.querySelector('#newpassword');
//         const confirmPasswordField = document.querySelector('#confirmpassword');
//         const oldPassword = oldPasswordField.value;
//         const newPassword = newPasswordField.value;
//         const confirmPassword = confirmPasswordField.value;
//         const request = {
//             method: "PUT",
//         }
//         const url = `${BACKEND_HOST}/api/users/${me.id}/updatePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`
//         fetch(url, request)
//             .then(function(response) {
//                 CreateView("/");
//             });
//     });
// }
// function doTogglePasswordHandler() {
//     const button = document.querySelector("#toggleShowPassword");
//     button.addEventListener("click", function(event) {
//         const oldPassword = document.querySelector("#oldpassword");
//         const newPassword = document.querySelector("#newpassword");
//         const confirmPassword = document.querySelector("#confirmpassword");
//         if(confirmPassword.getAttribute("type") === "password") {
//             confirmPassword.setAttribute("type", "text");
//             oldPassword.setAttribute("type", "text");
//             newPassword.setAttribute("type", "text");
//         } else {
//             confirmPassword.setAttribute("type", "password");
//             oldPassword.setAttribute("type", "password");
//             newPassword.setAttribute("type", "password");
//         }
//     });
// }