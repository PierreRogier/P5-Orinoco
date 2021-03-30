export const url = "http://localhost:3000/api/teddies";

export const formatPrice = (price) => {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price / 100);
};
