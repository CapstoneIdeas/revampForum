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
                <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="Search for a Post"
                />
            </div>
             <div >
<!--                            <label for="category">Category</label>-->
<!--                                <div class="radio-toolbar">-->
<!--                                    <input type="radio" id="radioDataScience" name="radioCategory" value="dataScience">-->
<!--                                    <label for="radioDataScience">Data Science</label>-->

<!--                                    <input type="radio" id="radioGenerativeArt" name="radioCategory" value="generativeArt">-->
<!--                                    <label for="radioGenerativeArt">Generative Art</label>-->

<!--                                    <input type="radio" id="radioLanguages" name="radioCategory" value="language">-->
<!--                                    <label for="radioLanguages">Languages</label>-->
<!--                                    -->
<!--                                    <input type="radio" id="radioUiUxDesign" name="radioCategory" value="radioUiUxDesign">-->
<!--                                    <label for="radioUiUxDesign">UI/UX Design</label>-->

<!--                                    <input type="radio" id="radioWebDevelopment" name="radioCategory" value="webDevelopment">-->
<!--                                    <label for="radioWebDevelopment">Web Development</label>-->
<!--                                </div>     -->
<!--                        </div>-->
                        <div class ="btn-container">
                        <button class="filter-btn" type="button" data-id="all"> all</button>
                        
                        <button class="filter-btn" type="button" data-id="DATA_SCIENCE"> Data Science</button>
                        
                        <button class="filter-btn" type="button" data-id="GENERATIVE_ART"> Generative Art</button>
                        
                        <button class="filter-btn" type="button" data-id="LANGUAGES"> Languages</button>
                        
                        <button class="filter-btn" type="button" data-id="UIUX_DESIGN"> Uiux Design</button>
                       
                        <button class="filter-btn" type="button" data-id="WEB_DEVELOPMET"> Web Development</button>
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
                                <!--  div below has the scroll  -->
                          <div class="modal-dialog  modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">${post?.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                              <p> ${post?.content} </p>
                               <p> ${post?.category.name}</p> 
                              
                              </div>
                              <div class="modal-footer">
                                <H4> By : ${post?.author?.userName}</H4>
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
        filterByCatgories()
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

function filterByCatgories() {
const filterBtns = document.querySelectorAll('.filter-btn')

   filterBtns.forEach(function (btn) {
       btn.addEventListener('click',function (e) {

           const category = e.currentTarget.dataset.id;

           const codeCategory = posts.filter(function (postItem) {
               console.log(postItem.category);


               if (postItem.category === category){
                   return postItem
               }


           });
           console.log(codeCategory);
       })
   })

}