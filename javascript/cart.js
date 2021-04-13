import { url, getElement, getStore, formatPrice, checkInputIsValid, displayInputMessage } from "./utils.js";

const products = getElement(".cart-section-products_container");
const totalPrice = getElement(".cart-section-products_price");
const clearCartBtn = getElement(".btn-clearCart");
const orderBtn = getElement(".btn-order");
const cartForm = getElement(".cart-form");
const emptyCart = getElement(".empty-cart");
const productsNumberDOM = getElement(".products-number");
const firstNameDOM = getElement("#firstName");
const lastNameDOM = getElement("#lastName");
const addressDOM = getElement("#address");
const cityDOM = getElement("#city");
const emailDOM = getElement("#email");

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
    const formValidator = inputsValidation.some((input) => input.isValid === false);
    if (store.length < 1 || formValidator) {
        return;
    }
    orderBtn.disabled = true;

    const contact = {
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        address: addressDOM.value,
        city: cityDOM.value,
        email: emailDOM.value,
    };

    const products = [];
    store.forEach((product) => products.push(product._id));

    const data = { contact, products };

    try {
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
    } catch (error) {
        throw new Error({ error });
    }
});

function getProducts() {
    const store = getStore("cart");
    if (store.length === 0) {
        orderBtn.disabled = true;
        emptyCart.textContent = "Votre panier est vide";
    } else if (store.length > 0) {
        emptyCart.textContent = "";
    }
    products.innerHTML = displayProductsCart(store);
    totalPrice.textContent = formatPrice(getTotalPrice());
}

function displayProductsCart(arrayOfProducts) {
    return arrayOfProducts
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

export function getTotalPrice() {
    const store = getStore("cart");
    const totalPrice = store.reduce((total, item) => {
        return (total += item.price);
    }, 0);
    return totalPrice;
}

const inputsValidation = [
    {
        inputDOM: firstNameDOM,
        element: getElement(".firstname-input-message"),
        validMessage: "Prenom valide",
        errorMessage: "Prenom non valide",
        regex: /^[a-zA-Z-_ ]+$/,
        isValid: false,
    },
    {
        inputDOM: lastNameDOM,
        element: getElement(".lastname-input-message"),
        validMessage: "Nom valide",
        errorMessage: "Nom non valide",
        regex: /^[a-zA-Z-_ ]+$/,
        isValid: false,
    },
    {
        inputDOM: addressDOM,
        element: getElement(".address-input-message"),
        validMessage: "Adresse valide",
        errorMessage: "Adresse non valide",
        regex: /^[a-zA-Z0-9-,_ ]+$/,
        isValid: false,
    },
    {
        inputDOM: cityDOM,
        element: getElement(".city-input-message"),
        validMessage: "Ville valide",
        errorMessage: "Ville non valide",
        regex: /^[a-zA-Z-_ ]+$/,
        isValid: false,
    },
    {
        inputDOM: emailDOM,
        element: getElement(".email-input-message"),
        validMessage: "Email valide",
        errorMessage: "Email non valide",
        regex: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        isValid: false,
    },
];

inputsValidation.forEach((input) => {
    const { inputDOM } = input;
    inputDOM.addEventListener("blur", (e) => {
        let result = checkInputIsValid(e.target.value, input.regex);
        input.isValid = result;
        displayInputMessage(result, input.element, input.validMessage, input.errorMessage);
    });
});
