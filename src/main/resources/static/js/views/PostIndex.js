import createView from "../createView.js"
import {getHeaders, isLoggedIn} from "../auth.js";

let posts;
export default function PostIndex(props) {
   const postsHTML = generatePostsHTML(props.posts);
    posts = props.posts
    return `
       <header>
            <h1>Posts Page</h1>
            
            <div id="searchWrapper">
                <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="Search for a Post"
                />
            </div>
        </header>
        
        <main>
            <h4 class="heading">Recent Post</h4>
              
            <div class = "wrapper">

              ${postsHTML}   
              
            </div>
            
        </main>
    `;
}

function generatePostsHTML(posts) {
    let postsHTML = ``;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        let categories = '';
        for (let j = 0; j < post?.categories?.length; j++) {
            if(categories !== "") {
                categories += ", ";
            }
            categories += post.categories[j].name;
        }

        postsHTML += `   
        <div id="container">
            <div class="row">
                <div class="column">
                    <div class="product-details">
                        <h1>${post?.title}</h1>
                        <div class="text">
                        <p class="information">${post?.content}</p>
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${i}">
                          Read more
                        </button>
                       
                        
                        <!-- Modal -->
                        <div class="modal fade " id="staticBackdrop-${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
            </div>
        </div>
      
      `;
    }



    postsHTML += `</tbody></table>`;
    return postsHTML;
}

export function postSetup() {
        search();
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