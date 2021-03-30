// Navbar
const toggleBtn = document.querySelector(".toggle-btn");
const links = document.querySelector(".navbar-links-container");

toggleBtn.addEventListener("click", () => {
    links.classList.toggle("show-container");
});

// Footer
const date = document.querySelector(".footer-date");

window.addEventListener("DOMContentLoaded", () => {
    date.textContent = new Date().getFullYear();
});
