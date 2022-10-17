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
                placeholder="search for a character"
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
                        <p class="information">${post?.content}</p>
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
    console.log(divcards)

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', function (event){
        // console.log(event.key)
        const keylogger = searchBar.value.toLowerCase();
        console.log(keylogger)

        divcards.forEach((divcard) => {
            console.log(divcard.firstElementChild.firstElementChild);
            let content = divcard.firstElementChild.firstElementChild.innerText;
            console.log(content);
            if(content.toLowerCase().startsWith(keylogger)) {
                divcard.style.display = "block";
            } else {
                divcard.style.display = "none";
            }

        });


    });
}