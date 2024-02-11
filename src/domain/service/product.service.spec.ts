import { describe, expect, it } from "vitest";
import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
	it("should change the price of all products", () => {
		const product1 = new Product("product1", "Product 1", 10);
		const product2 = new Product("product2", "Product 2", 20);
		const products = [product1, product2];

		const productService = new ProductService();
		productService.increasePrice(products, 100);
		expect(product1.price).toBe(20);
		expect(product2.price).toBe(40);
	});
});
