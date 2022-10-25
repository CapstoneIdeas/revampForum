import CreateView from "../createView.js"
import {getHeaders, isLoggedIn, getUser} from "../auth.js";

let posts;
let loggedInUser;
// let profilePic;
export default function prepareUserHTML(props) {
    
    loggedInUser = getUser();
    console.log(loggedInUser);
    let username = loggedInUser.email.split('@')
    const imgAr = ['archer.png','elf.png','fairy.png','knight.png','wizard.png']
    let userImg = getRandomImage(imgAr);
    const postsHTML = generatePostsHTML(props.posts);
    posts = props.posts
    return `
    <header>
        <p class='userPageHeader'>Cipher.</p>
    </header>
    <main>
        <div class= 'userContainer'>
            <div class= 'userLeftDiv'>
                <!-- USER PFP --!>
                <div class= 'userInfoDiv'>
                    <div class='user-img-box'>
                        <img src= "${userImg}" class="user-img">
                    </div> 
                    <div class='usernameDiv'>
                        <p class='username-header'>${username[0]}</p>
                    </div>
                </div>
                <!-- ADD NEW POST FORM --!>
                <div class= 'newPostDiv'>
                    <form>
                    <h2>+ New Blog</h2>
                    <div class="large-group">
                        <div class="small-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" name="title" placeholder="Enter a subject..."/>
                        </div>
                        <!-- ADD NEW POST FORM CATEGORY BUTTONS --!>
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

                                <input type="radio" id="radioWebDevelopment" name="radioCategory" value="5">
                                <label for="radioWebDevelopment">Web Development</label>
                            </div>     
                        </div>
                        <!-- ADD NEW POST CONTENT AREA --!>
                        <div class="textarea-div">
                            <label for="content">Content</label>
                            <textarea id="content" type="text" name="content" placeholder="Enter some subject matter..."></textarea>
                        </div>
                            <input id="addPost" class="submit-btn" type="submit" name="addPost"/>
                    </div>
                </form>
                </div>
            </div>
            <!-- USER POST HISTORY --!>
            <div class= 'userRightDiv'>
                <div class='userPostHistory'>
                    <h3 class='blog-history-header'>Blog History</h3> 
                    <div class='scrollableDiv'> 
                        ${postsHTML} 
                    </div>
                 </div>
            </div>
        </div>
    </main>
    `;
}

// GENERATE RANDOM USER IMAGE FROM ASSET FOLDER
function getRandomImage(imgAr) {
    const path = '../assets/users/';
    let num = Math.floor( Math.random() * imgAr.length );
    let img = imgAr[ num ];
    // var imgStr = '<img src="' + path + img + '" alt = "user image">';
    // document.write(imgStr); document.close();
    return (path + img);
}

// GENERATE LIST OF POSTS WITH EDIT AND DELETE OPTION
function generatePostsHTML(posts) {
    
    let postsHTML = ``;
    if(posts) {
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            // COMPARE LOGGED IN USER WITH POST USER ID
            if(loggedInUser.id !== post.author.id) {
                continue
            }
            // POPULATE ASSOCIATED CATEGORY IMG WITH BLOG POST
            let categoryImg = '../assets/denzel.jpg';
            if(post.category.id === 1){
                categoryImg = "../assets/data-science.png";
            }
            if(post.category.id === 2){
                categoryImg = "../assets/generative-art.png";
            }
            if(post.category.id === 3){
                categoryImg = "../assets/languages.png";
            }
            if(post.category.id === 4){
                categoryImg = "../assets/ui-ux-design.png";
            }
            if(post.category.id === 5){
                categoryImg = "../assets/web-development.png";
            }
            postsHTML += `
                <div class="blogCard">
                    <div class="img-category-box">
                        <img src="${categoryImg}" class="category-img" />
                        <p class="text-blk blog-category">${post?.category.name}</p>
                    </div>                    
                    <div class="blog-card-content-box">
                        <p class="text-blk blog-title">${post?.title}</p>
                        <p class="text-blk blog-author"><i>posted by</i> <b>${post?.author?.userName}</b></p>
                        <p class="text-blk blog-content">${post?.content}</p>
                        
                        <div class="blog-card-btn-box">
                        <!-- BOOTSTRAP CRUD BUTTONS --!>
                            <button type="button" class="btn btn-primary readPost" data-bs-toggle="modal" data-bs-target="#readModal-${i}">Read More</button>
                            <button type="button" class="btn btn-primary updatePost" data-bs-toggle="modal" data-bs-target="#editModal-${i}" data-id=${post.id}><img src='../assets/edit.png' class='btn-icon'></button>
                            <button type="button" class="btn btn-primary deletePost" data-id=${post.id}><img src='../assets/trash.png' class='btn-icon'></button>
                        </div>

                        <!-- BOOTSTRAP READ MORE MODAL --!>
                        <div class="modal fade" id="readModal-${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <!-- BLOG CONTENT W/ SCROLL --!>
                            <div class="modal-dialog  modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">${post?.title}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p> ${post?.content} </p>
                                    </div>
                                    <div class="modal-footer">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- BOOTSTRAP EDIT MODAL --!>
                        <div class="modal fade editModal" id="editModal-${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <!-- BLOG CONTENT W/ SCROLL --!>
                            <div class="modal-dialog  modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <p>Edit Blog Post:</p>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <input class="titleInput" id="titleInput-${post.id}" value="${post?.title}">
                                    <!-- BOOTSTRAP SELECTOR --!>
                                    <select class="categorySelect" id="editCategory-${post.id}" aria-label="Category Menu">
                                        <option selected>Category Menu</option>
                                        <option value="1">Data Science</option>
                                        <option value="2">Generative Art</option>
                                        <option value="3">Languages</option>
                                        <option value="4">UI/UX Design</option>
                                        <option value="5">Web Development</option>
                                    </select>
                                    <div class="modal-body">
                                        <textarea class="contentInput" id="contentInput-${post.id}">${post?.content}</textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary savePost" data-id="${post.id}" data-bs-dismiss="modal" aria-label="Save">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    postsHTML += ``;
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
        const checkedCategory = document.querySelector("input[name=radioCategory]:checked");
        
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
    const editButtons = document.querySelectorAll(".updatePost");
    const saveButtons = document.querySelectorAll(".savePost");

    for (let i = 0; i < saveButtons.length; i++) {
        saveButtons[i].addEventListener("click", function(e) {
            
            const postId = this.getAttribute("data-id");
            const titleInput =  document.querySelector("#titleInput-" + postId);
            const editedTitle = titleInput.value.trim();
            const selectedCategory = document.querySelector("#editCategory-" + postId).value;
            const contentInput = document.querySelector("#contentInput-" + postId);
            const editedContent = contentInput.value.trim();

            if(isLoggedIn()){
                if((editedTitle.value === "") || (editedContent.value === "")) {
                    console.log("Content required");
                }else{
                let updatedPost = {
                    title: editedTitle,
                    category: {id:selectedCategory},
                    content: editedContent,
                }
                console.log(updatedPost);
                let request = {
                    method: "PUT",
                    headers: getHeaders(),
                    body: JSON.stringify(updatedPost)
                }
                let url = `http://localhost:8080/api/posts/${editButtons[i].getAttribute("data-id")}`;
                fetch(url, request).then(request => {
                    location.reload();
                });
    
            }
            }
        })
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