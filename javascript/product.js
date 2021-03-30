import { url, formatPrice, getElement, getStore } from "./utils.js";

const id = window.location.search.substring(4);

const imgDOM = getElement(".product-section_article_img");
const titleDOM = getElement(".product-section_article_title");
const priceDOM = getElement(".product-section_article_price");
const descDOM = getElement(".product-section_article_desc");
const addBtn = getElement(".add-btn");
const colorsDOM = getElement("#colors");

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`${url}/${id}`);
        const data = await response.json();

        const { name, imageUrl, description, price, colors } = data;

        imgDOM.src = imageUrl;
        imgDOM.alt = name;
        titleDOM.textContent = name;
        priceDOM.textContent = formatPrice(price);
        descDOM.textContent = description;

        addBtn.addEventListener("click", () => {
            const store = getStore("cart");
            const newStore = [...store, data];
            localStorage.setItem("cart", JSON.stringify(newStore));
        });

        colorsDOM.innerHTML = colors
            .map((color) => {
                return `<option value=${color}>${color}</option>`;
            })
            .join("");
    } catch (error) {
        console.log(error);
    }
});
