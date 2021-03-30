import { url } from "./utils.js";

const productsDOM = document.querySelector(".products-container");

// DOMContentLoaded - the whole document (HTML) has been loaded.
window.addEventListener("DOMContentLoaded", async () => {
    // Get the Data from the server
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Display the Data
        productsDOM.innerHTML = data
            .map((product) => {
                const { name, imageUrl, _id: id } = product;

                return `
            <article class="home-product">
                <h3>${name}</h3>
                <div>
                    <img src=${imageUrl} alt=${name}>
                </div>      
                <a class="btn more-btn" href="product.html?id=${id}">En savoir plus</a>
            </article>  
            `;
            })
            .join("");
    } catch (error) {
        console.log(error);
    }
});
