export const url = "http://localhost:3000/api/teddies";

export const formatPrice = (price) => {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price / 100);
};

export const getElement = (selection) => {
    const element = document.querySelector(selection);
    if (element) return element;
    throw new Error(`The element ${selection} doesnt'exist`);
};

export const getStore = (name) => {
    let store = localStorage.getItem(name);
    if (store) {
        store = JSON.parse(localStorage.getItem(name));
    } else {
        store = [];
        localStorage.setItem(name, JSON.stringify(store));
    }
    return store;
};

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const checkInputIsValid = (inputStr, regex) => {
    if (inputStr.match(regex)) {
        return true;
    }
    return false;
};

export const displayInputMessage = (bool, element, validMessage, errorMessage) => {
    if (bool) {
        element.textContent = validMessage;
        element.style.color = "green";
    } else {
        element.textContent = errorMessage;
        element.style.color = "red";
    }
};
