import createView from "../createView.js"
import {getHeaders, isLoggedIn} from "../auth.js";

let posts;
export default function PostIndex(props) {
    const postsHTML = generatePostsHTML(props.posts);
    posts = props.posts
    // console.log(props.posts);
    return `
       <header>
            <h1>Posts Page</h1>
            <div id="searchWrapper">
                <input type="text" name="searchBar" id="searchBar" placeholder="Search for a Post"/>
            </div>
            <!-- CATEGORY FILTER BUTTONS --!>
            <div class ="btn-container">
                <button class="filter-btn" type="button" data-id="all"> all</button>
                    
                <button class="filter-btn" type="button" data-id="1"> Data Science</button>
                    
                <button class="filter-btn" type="button" data-id="2"> Generative Art</button>
                    
                <button class="filter-btn" type="button" data-id="3"> Languages</button>
                    
                <button class="filter-btn" type="button" data-id="4"> Uiux Design</button>
                    
                <button class="filter-btn" type="button" data-id="5"> Web Development</button>
            </div>          
        </header>
        <main>
            <!-- MAIN LIST OF SEARCHED POSTS --!>
            <div class='mainPostDiv'>
                <div class='post-list'>
                    <h4 class="main-post-header">Recent Post</h4>
                    <div id="post-wrapper" class = "wrapper">
                        ${postsHTML}   
                    </div>
                </div>    
            </div>
        </main>
    `;
}

// GENERATE LIST OF POSTS WITH READ ME OPTION
function generatePostsHTML(posts) {
    
    let postsHTML = ``;
    
    if(posts) {
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            // COMPARE LOGGED IN USER WITH POST USER ID
            // if(loggedInUser !== post.author.id) {
            //     continue
            // }
        // for (let i = 0; i < posts.length; i++) {
        //     const post = posts[i];
        //     let categories = '';
        //     for (let j = 0; j < post?.categories?.length; j++) {
        //         if(categories !== "") {
        //             categories += ", ";
        //         }
        //         categories += post.categories[j].name;
        //     }
            postsHTML += `   
                <div class="blogCard">
                    <div class="img-category-box">
                        <img src="../assets/denzel.jpg"class="category-img" />
                        <p class="text-blk blog-category">${post?.category.name}</p>
                    </div>
                    <div class="blog-card-content-box">
                        <p class="text-blk blog-title">${post?.title}</p>
                        <p class="text-blk blog-author"><i>posted by</i> <b>${post?.author?.userName}</b></p>
                        <p class="text-blk blog-content">${post?.content}</p>
                    <!-- BOOTSTRAP CRUD BUTTONS --!>
                    <div class="blog-card-btn-box">
                        <button type="button" class="btn btn-primary readPost" data-bs-toggle="modal" data-bs-target="#readModal-${i}">Read More</button>
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
                </div>
            </div>
            `;
        }
    }
    postsHTML += ``;
    return postsHTML;
}

export function postSetup() {
        search();
        filterByCategories()
}

function search() {
    const divcards = document.querySelectorAll('.column')


    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', function (event){
        const keylogger = searchBar.value.toLowerCase();


        divcards.forEach((divcard) => {
            let content = divcard.firstElementChild.firstElementChild.innerText;

            if(content.toLowerCase().startsWith(keylogger)) {
                divcard.style.display = "block";
            } else {
                divcard.style.display = "none";
            }

        });
    });
}

function filterByCategories() {
const filterBtns = document.querySelectorAll('.filter-btn')

   filterBtns.forEach(function (btn) {
       btn.addEventListener('click',function (e) {
           const button = this.getAttribute("data-id");
           console.log(typeof(button));
           const category = e.currentTarget.dataset.id;

           const codeCategory = posts.filter(function (postItem) {
               // console.log(postItem.category);
               // console.log(postItem.category.id);


               if (button === "all"){
                return true;

               }

              return Number.parseInt(button) === postItem?.category.id;




           });
           console.log(codeCategory);
           // render the codeCategory array to html
           const filteredHTML = generatePostsHTML(codeCategory);
           document.querySelector("#post-wrapper").innerHTML = filteredHTML;
       })
   })

}