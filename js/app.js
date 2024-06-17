import * as components from "./components.js";

window.addEventListener("DOMContentLoaded", initHomeViewAsync);

async function initHomeViewAsync() {
    const res = await fetch("./data/articles.json");
    const body = await res.json();
    console.log(body);
    const nav = components.Navbar();
    document.body.appendChild(nav);
}