import { fetchData, url, formatPrice, getStore } from "../javascript/utils.js";

const sum = (a, b) => {
    return a + b;
};

test("sum 1 + 1", () => {
    expect(typeof sum(1, 1)).toBe("number");
});

test("get data", async () => {
    expect(fetchData(url)).toBeDefined();
});

test("price formated", () => {
    expect(typeof formatPrice(200)).toBe("string");
});

test("get store", () => {
    expect(typeof getStore("blabla")).toBe("object");
});
