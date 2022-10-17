import createView from "../createView.js"
import {getHeaders, isLoggedIn} from "../auth.js";

let posts;
export default function PostIndex(props) {
   const postsHTML = generatePostsHTML(props.posts);
    posts = props.posts
    return `
    <header>
     <h1>Posts Page</h1>
    </header>
    <main>
     <h3>List of posts</h3>
     <div>
        ${postsHTML}
     </div>
     <br>
     <h3>add a post</h3>
     <form action="">
      <label for="title">Title</label><br>
      <input id="title" name="title" type="text" placeholder="Enter title for post">
      <br>
      <label for="content">Content</label><br>
      <textarea name="content" id="content" cols="50" rows="10" placeholder="Enter content"></textarea>
      <button id="addPost" name="addPost">Add post</button>
      </form>
     </main>
`;
}
function generatePostsHTML(posts) {
    let postsHTML = `
        <table class="table">
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col" colspan="3">Content</th>
        </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        let categories = '';
        for (let j = 0; j < post?.categories?.length; j++) {
            if(categories !== "") {
                categories += ", ";
            }
            categories += post.categories[j].name;
        }

        postsHTML += `<tr>
            <td>${post?.title}</td>
            <td>${post?.content}</td>
            <td>${categories}</td>
            <td data-user-id=${post?.author?.id}>${post?.author?.userName}</td>
            <td><button data-id=${post.id} class="button btn-primary editPost">Edit</button></td>
            <td><button data-id=${post.id} class="button btn-danger deletePost">Delete</button></td>
            </tr>`;
    }
    postsHTML += `</tbody></table>`;
    return postsHTML;
}
function addPostHandler(){
    const addButton = document.querySelector("#addPost")
    addButton.addEventListener("click", function (event) {
        const titleField =  document.querySelector("#title");
        const contentField = document.querySelector("#content");
        if(isLoggedIn()){
        if((titleField.value === "") || (contentField.value === "")) {
            console.log("content required");
        }
        else {
            let newPost = {
                title: titleField.value,
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
                    createView("/posts");
                })
        }}
        else{
            console.log("Must Be logged in");
        }
    })}
function editPostHandlers() {
    const editButtons = document.querySelectorAll(".editPost");
    const titleField =  document.querySelector("#title");
    const contentField = document.querySelector("#content");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function(event) {
            console.log(editButtons[i].getAttribute("data-id") + "will be edited");
            if(isLoggedIn()){
            if((titleField.value === "") || (contentField.value === "")) {
                console.log("needs more data");
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
            console.log("Must Be logged in");
        }});
    }
}
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

        }
    else{
            console.log("Must Be logged in");
        }});
    }
}
    export function postSetup() {
        addPostHandler();
        editPostHandlers();
        deletePostHandlers();
    }