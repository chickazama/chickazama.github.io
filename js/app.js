import * as components from "./components.js";
import * as articles from "./articles/example.json";

window.addEventListener("DOMContentLoaded", initHomeViewAsync);

async function initHomeViewAsync() {
    console.log(articles);
    const nav = components.Navbar();
    document.body.appendChild(nav);
}