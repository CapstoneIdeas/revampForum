import CreateView from "../createView.js"
import {getHeaders, isLoggedIn, getUser} from "../auth.js";

let posts;
let loggedInUser;
// let profilePic;
export default function prepareUserHTML(props) {
    
    loggedInUser = getUser();
    console.log(loggedInUser);
    const postsHTML = generatePostsHTML(props.posts);
    posts = props.posts
    return `
    <header>
        <h2>User Blog</h2>
    </header>
    <main>
        <div class= 'userContainer'>
            <div class= 'userLeftDiv'>
                <div class= 'userInfoDiv'>
                    <img src= "${loggedInUser.profilePic}" class="user-img">
                </div>
                <div class= 'newPostDiv'>
                    <form>
                    <h2>+ New Blog</h2>
                    <div class="large-group">
                        <div class="small-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" name="title" placeholder="Enter a subject..."/>
                        </div>
                        <div class="small-group">
                            <label for="category">Category</label>
                            <div class="radio-toolbar">
                                <input type="radio" id="radioDataScience" name="radioCategory" value="1">
                                <label for="radioDataScience">Data Science</label>

                                <input type="radio" id="radioGenerativeArt" name="radioCategory" value="2">
                                <label for="radioGenerativeArt">Generative Art</label>

                                <input type="radio" id="radioLanguages" name="radioCategory" value="3">
                                <label for="radioLanguages">Languages</label>
                                
                                <input type="radio" id="radioUiUxDesign" name="radioCategory" value="4">
                                <label for="radioUiUxDesign">UI/UX Design</label>
¡
                                <input type="radio" id="radioWebDevelopment" name="radioCategory" value="5">
                                <label for="radioWebDevelopment">Web Development</label>
                            </div>     
                        </div>
                        <div class="textarea-div">
                            <label for="content">Content</label>
                            <textarea id="content" type="text" name="content" placeholder="Enter some subject matter..."></textarea>
                        </div>
                            <input id="addPost" class="btn" type="submit" name="addPost"/>
                    </div>
                </form>
                </div>
            </div>
            <div class= 'userRightDiv'>
                <div class= 'userPostHistory'>
                    <h3>Blog History</h3> 
                    ${postsHTML} 
                 </div>
            </div>
        </div>
    </main>
    `;
}

// GENERATE TABLE OF POSTS WITH EDIT AND DELETE OPTION
function generatePostsHTML(posts) {
    
    let postsHTML = ``;

    if(posts) {
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            // COMPARE LOGGED IN USER WITH POST USER ID
            if(loggedInUser.id !== post.author.id) {
                continue
            }
            postsHTML += `
                <div class="blogCard">
                    <div class="img-category-box">
                        <img src="../assets/denzel.jpg"class="category-img" />
                    </div>
                    <div class="blog-card-content-box">
                        <p class="text-blk blog-title">${post?.title}</p>
                        <p class="text-blk blog-author"><i>posted by</i> <b>${post?.author?.userName}</b></p>
                        <p class="text-blk blog-category"><i>posted to</i> <b>${post?.category.name}</b></p>
                        <p class="text-blk blog-content">${post?.content}</p>
                        <div class="blog-card-btn-box">
                            <button data-id=${post.id} class="button btn-primary editPost">Edit</button>
                            <button data-id=${post.id} class="button btn-danger deletePost">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    postsHTML += `</tbody></table>`;
    return postsHTML;
}

// EXPORT FUNCTION FOR CRUD METHODS
export function blogSetup() {
    addPostHandler();
    editPostHandlers();
    deletePostHandlers();
}

// CREATE A BLOG POST
function addPostHandler(){
    const addButton = document.querySelector("#addPost")
    addButton.addEventListener("click", function (event) {
        const titleField =  document.querySelector("#title");
        const contentField = document.querySelector("#content");
        const checkedCategory = document.querySelector('input[name=radioCategory]:checked');
        if(isLoggedIn()){
        if((titleField.value === "") || (contentField.value === "")) {
            console.log("Content required");
        }
        else {
            let newPost = {
                title: titleField.value,
                category: {id:checkedCategory.value},
                content: contentField.value,
            }
            console.log(newPost);
            let request = {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(newPost)
            }
            fetch("http://localhost:8080/api/posts", request)
                .then(response => {
                    console.log(response.status);
                    CreateView("/user");
                })
        }}
        else{
            console.log("Login required");
        }
    })
}  

// UPDATE A BLOG POST
function editPostHandlers() {
    const editButtons = document.querySelectorAll(".editPost");
    const titleField =  document.querySelector("#title");
    const contentField = document.querySelector("#content");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function(event) {
            console.log(editButtons[i].getAttribute("data-id") + "will be edited");
            if(isLoggedIn()){
            if((titleField.value === "") || (contentField.value === "")) {
                console.log("Content required");
            }
            else{
            let editPost = {
                title: titleField.value,
                content: contentField.value,
            }
            let request = {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify(editPost)
            }
            let url = `http://localhost:8080/api/posts/${editButtons[i].getAttribute("data-id")}`;
            fetch(url, request).then(response => response.json());
            location.reload();
        }}
        else{
            console.log("Login required");
        }});
    }
}

// DELETE A BLOG POST
function deletePostHandlers() {
    const deleteButtons = document.querySelectorAll(".deletePost");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function (event) {
            if (isLoggedIn()){
            console.log(deleteButtons[i].getAttribute("data-id") + "will be deleted");
            let request = {
                method: "DELETE",
                headers: getHeaders(),
            }
            let url = `http://localhost:8080/api/posts/${deleteButtons[i].getAttribute("data-id")}`
            fetch(url, request).then(response => response.json());
            location.reload();

        }else{
            console.log("Login required");
        }});
    }
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