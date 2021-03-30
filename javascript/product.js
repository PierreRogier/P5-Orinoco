import {url, formatPrice} from "./utils.js"

const id = window.location.search.substring(4);

const article = document.querySelector(".product-section_article");
const imgDOM = document.querySelector(".product-section_article_img");
const titleDOM = document.querySelector(".product-section_article_title");
const priceDOM = document.querySelector(".product-section_article_price");
const descDOM = document.querySelector(".product-section_article_desc");
const addBtn = document.querySelector(".btn-add");
const colorsDOM = document.querySelector("#colors");

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

        colorsDOM.innerHTML = colors
            .map((color) => {
                return `<option value=${color}>${color}</option>`;
            })
            .join("");
    } catch (error) {
        console.log(error);
    }
});
