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
    let postsHTML = `
<!--        <table class="table">-->
<!--        <thead>-->
<!--        <tr>-->
<!--            <th scope="col">Title</th>-->
<!--            <th scope="col" colspan="3">Content</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
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


        postsHTML += `
         
          
                 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div id="container">
        <div class="row">
            <div class="column">
                <div class="product-details">
                    <h1>${post?.title}</h1>
                    <p class="information">${post?.content}</p>

                    <div class="control">

                        <button class="btn">
                        <span class="price">Read</span>
                        <span class="shopping-cart"><i class="fa fa-folder-open " aria-hidden="true"></i></span>
                        <span class="buy">More</span>
                        </button>
                    </div>
                </div>

                <div class="product-image">
                    <img src="https://images.unsplash.com/photo-1606830733744-0ad778449672?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNocmlzdG1hcyUyMHRyZWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
                    <div class="info">
                        <h2> Description</h2>
                        <ul>
                        <li><strong>Height : </strong>5 Ft </li>
                        <li><strong>Shade : </strong>Olive green</li>
                        <li><strong>Decoration: </strong>balls and bells</li>
                        <li><strong>Material: </strong>Eco-Friendly</li>    
                         </ul>
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