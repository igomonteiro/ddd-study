import { describe, expect, it } from "vitest";
import OrderItem from "./order-item";
import Order from "./order";
import Product from "./product";

describe("Product unit tests", () => {
	it("should throw error when error id is empty", () => {
		expect(() => {
			const product = new Product("", "Product 1", 100);
		}).toThrowError("ID is required");
	});

	it("should throw error when error name is empty", () => {
		expect(() => {
			const product = new Product("123", "", 100);
		}).toThrowError("Name is required");
	});

	it("should throw error when error price is less than 0", () => {
		expect(() => {
			const product = new Product("1", "123", -1);
		}).toThrowError("Price must be greater than zero");
	});

	it("should change name", () => {
		const product = new Product("123", "Product 1", 100);
		product.changeName("Product 2");
		expect(product.name).toBe("Product 2");
	});

	it("should change price", () => {
		const product = new Product("123", "Product 1", 100);
		product.changePrice(200);
		expect(product.price).toBe(200);
	});
});
