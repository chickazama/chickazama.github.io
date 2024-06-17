window.addEventListener("DOMContentLoaded", initHomeView);

function initHomeView() {
    const h1 = document.createElement("h1");
    h1.innerText = "Welcome!";
    document.body.appendChild(h1);
}