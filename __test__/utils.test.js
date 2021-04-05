import { formatPrice, getStore } from "../javascript/utils.js";

const sum = (a, b) => {
    return a + b;
};

test("sum 1 + 1", () => {
    expect(sum(1, 1)).toBe(2);
});

test("price formated", () => {
    expect(typeof formatPrice(200)).toBe("string");
});

test("get store", () => {
    expect(typeof getStore("blabla")).toBe("object");
});
