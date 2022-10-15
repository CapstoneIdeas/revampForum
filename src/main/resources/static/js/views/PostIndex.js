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
   
              <h3>Lists of posts</h3>
            <div>
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
        // <div className="card" id="divcard" style="width: 18rem;">
        //     <div className="card-body">
        //         <h5 className="card-title">${post?.title}</h5>
        //         <p className="card-text">${post?.content}</p>
        //         <li>${categories}</li>
        //         <li data-user-id=${post?.author?.id}>${post?.author?.userName}</li>
        //         <a href="#" className="btn btn-primary">Read More</a>
        //
        //
        //     </div>
        postsHTML += `
              
          </div>
          <div class="card" id="divcard" style="width: 18rem;">
               <div class="post-feature">
                        <span class="fs-6 has-line">Travels</span>
                        <h6><a href="details.html">${post?.title.toUpperCase()}</a></h6>
                        <div class="blog-item-info-release">
                            <span>March 25, 2021</span> <span class="dot"></span> <span>4 min read</span>
                        </div>
                        <a href="details.html" class="btn btn-link">Read Article
                            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 1.5L17 6M17 6L12.5 10.5M17 6H1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </a>
                    </div> 
                <div>

`;
    }
    postsHTML += `</tbody></table>`;
    return postsHTML;
}

function search() {
    const divcards = document.querySelectorAll('.card')
    console.log(divcards)

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', function (event){
        // console.log(event.key)
        const keylogger = searchBar.value.toLowerCase();
        console.log(keylogger)

        divcards.forEach((divcard) => {
            console.log(divcard.firstElementChild.firstElementChild.firstElementChild);
            let content = divcard.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText;
            console.log(content);
            if(content.toLowerCase().startsWith(keylogger)) {
                divcard.style.display = "block";
            } else {
                divcard.style.display = "none";
            }

        });


    });
}
    export function postSetup() {

        search();
    }