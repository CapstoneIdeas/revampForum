import createView from "../createView.js";
export default function Logout(props) {
    console.log("Logging out...");
    return `  
  <div class="loader">
    <p>l</p>
    <p>o</p>
    <p>g</p>
    <p>g</p>
    <p>i</p>
    <p>n</p>
    <p>g</p>
  </div>
    <br>    
    <h1>Out</h1>`
;
}
export function LogoutEvents() {
    window.setTimeout( function () {
    window.localStorage?.removeItem("access_token");
    window.localStorage?.removeItem("user");
    window.localStorage?.removeItem("refresh_token");
    createView("/");},10)
}