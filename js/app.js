import * as components from "./components.js";

window.addEventListener("DOMContentLoaded", initHomeViewAsync);

async function initHomeViewAsync() {
    const header = document.createElement("header");
    const nav = components.Navbar();
    header.appendChild(nav);
    document.body.appendChild(header);
}