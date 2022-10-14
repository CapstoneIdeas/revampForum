import createView from './createView.js';
import {checkForLoginTokens, setLoggedInUserInfo} from './auth.js';


// export default function init() {
//     loadViewOnPageRequest();
//     addListenerToNavLinks();
// }
export default function init() {
    if(checkForLoginTokens(window.location.href)) {
        setLoggedInUserInfo();
        createView("/");
        return;
    }
    loadViewOnPageRequest();
    addListenerToNavLinks();
}
/**
 * When the DOM loads, build the view given the current endpoint.
 */
function loadViewOnPageRequest() {
    window.addEventListener('DOMContentLoaded', function() {
        //TODO: Switched to location.pathname so the route would be accurate to current view
        createView(location.pathname);
        document.querySelector("footer").innerText = "2022 CopyrightⒸ " + LINK + " | established 2022 | Ver. " + FRONTEND_VERSION;
    });
}
/**
 * Add a listener that will change the view if a nav link is clicked.
 */
function addListenerToNavLinks() {
    document.addEventListener('click', (event) => {
        // we want checkboxes and labels to keep their default behavior when clicked
        // and not prevent the default
        if(event.target.type && event.target.type === "checkbox") {
            return;
        }
        if(event.target.matches('label')) {
            return;
        }
        event.preventDefault();
        if (event.target.dataset['link'] !== undefined) {
            const URI = event.target.href.substring(location.origin.length);
            createView(URI);
        }
    });
}

