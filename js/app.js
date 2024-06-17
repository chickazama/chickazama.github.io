import * as components from "./components.js";
// import * as articles from "./articles/example.json";

window.addEventListener("DOMContentLoaded", initHomeViewAsync);

async function initHomeViewAsync() {
    // const res = await fetch("./js/articles/example.json");
    // const body = await res.json();
    // console.log(body);
    const nav = components.Navbar();
    document.body.appendChild(nav);
}