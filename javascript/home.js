import { url, getElement, fetchData } from "./utils.js";

const productsDOM = getElement(".products-container");

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await fetchData(url);
        productsDOM.innerHTML = displayProductsHome(data);
    } catch (error) {
        console.log(error);
        productsDOM.innerHTML = `<h2>Produits indisponibles</h2>`;
    }
});

function displayProductsHome(arrayOfProducts) {
    return arrayOfProducts
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
}
