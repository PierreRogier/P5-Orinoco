import { url, getElement, getStore, formatPrice } from "./utils.js";

const products = getElement(".cart-section-products_container");
const totalPrice = getElement(".cart-section-products_price");
const clearCartBtn = getElement(".btn-clearCart");
const orderBtn = getElement(".btn-order");
const cartForm = getElement(".cart-form");
const emptyCart = getElement(".empty-cart");
const productsNumberDOM = getElement(".products-number");

window.addEventListener("DOMContentLoaded", () => {
    getProducts();
    products.addEventListener("click", removeFromCart);
});

clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    getProducts();
    productsNumberDOM.textContent = 0;
});

cartForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const store = getStore("cart");
    if (store.length < 1) {
        return;
    } else {
        orderBtn.disabled = true;

        const firstName = getElement("#firstName").value;
        const lastName = getElement("#lastName").value;
        const address = getElement("#address").value;
        const city = getElement("#city").value;
        const email = getElement("#email").value;

        const contact = {
            firstName,
            lastName,
            address,
            city,
            email,
        };

        const products = [];
        store.forEach((product) => products.push(product._id));

        const data = { contact, products };

        const response = await fetch(`${url}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        const orderId = result.orderId;
        const orderTotal = getTotalPrice();
        const orderData = { orderId, orderTotal };
        localStorage.setItem("order", JSON.stringify(orderData));
        localStorage.removeItem("cart");
        location.replace("order.html");
    }
});

function getProducts() {
    const store = getStore("cart");
    if (store.length === 0 || store === null || store === undefined) {
        orderBtn.disabled = true;
        emptyCart.textContent = "Votre panier est vide";
    } else if (store.length > 0) {
        emptyCart.textContent = "";
    }
    products.innerHTML = store
        .map((product) => {
            const { name, imageUrl, _id, price } = product;
            return `
            <article class="cart-product">
                <div>
                    <img src=${imageUrl} alt=${name}>
                </div>
                <h3 class="product-name">${name}</h3>
                <p class="product-price">${formatPrice(price)}</p>        
                <button class="btn more-btn btn-remove" data-id=${_id}>Supprimer</button>
                </article>
                <hr/>
            `;
        })
        .join("");
    totalPrice.textContent = formatPrice(getTotalPrice());
}

function removeFromCart(e) {
    if (e.target.classList.contains("btn-remove")) {
        const store = getStore("cart");
        const index = store.findIndex((item) => item._id === e.target.dataset.id);
        store.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(store));
        getProducts();
        productsNumberDOM.textContent = store.length;
    }
}

function getTotalPrice() {
    const store = getStore("cart");
    const totalPrice = store.reduce((total, value) => {
        return (total += value.price);
    }, 0);
    return totalPrice;
}
