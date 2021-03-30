import { getElement, formatPrice } from "./utils.js";

const orderData = JSON.parse(localStorage.getItem("order"));

const orderIdDOM = getElement(".orderId");
const orderTotalDOM = getElement(".orderTotal");

orderIdDOM.textContent = orderData.orderId;
orderTotalDOM.textContent = formatPrice(orderData.orderTotal);
