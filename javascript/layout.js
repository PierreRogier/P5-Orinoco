import { getElement, getStore } from "./utils.js";

const toggleBtn = getElement(".toggle-btn");
const links = getElement(".navbar-links-container");
const productsNumberDOM = getElement(".products-number");
const date = getElement(".footer-date");

toggleBtn.addEventListener("click", () => {
    links.classList.toggle("show-container");
});

window.addEventListener("DOMContentLoaded", () => {
    const productsNumbers = getStore("cart").length;
    productsNumberDOM.textContent = productsNumbers;
    date.textContent = new Date().getFullYear();
});
