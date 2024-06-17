import * as components from "./components.js";

window.addEventListener("DOMContentLoaded", initHomeViewAsync);

let articles;

async function initHomeViewAsync() {
    const res = await fetch("/js/data/articles.json");
    articles = await res.json();
    console.log("Articles:");
    console.log(articles);
    const header = document.createElement("header");
    const nav = components.Navbar();
    header.appendChild(nav);
    document.body.appendChild(header);
}