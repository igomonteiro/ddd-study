import { describe, expect, it } from "vitest";
import OrderItem from "./order-item";
import Order from "./order";

describe("Order unit tests", () => {
	it("should set _total property to the sum of prices of all OrderItems", () => {
		const orderItem1 = new OrderItem("1", "Item 1", 10, "p1", 2);
		const orderItem2 = new OrderItem("2", "Item 2", 20, "p2", 2);
		const items = [orderItem1, orderItem2];
		const order = new Order("1", "customer1", items);
		expect(order.total).toBe(60);
	});

	it("should update _total property when adding an OrderItem", () => {
		const orderItem1 = new OrderItem("1", "Item 1", 10, "p1", 2);
		const orderItem2 = new OrderItem("2", "Item 2", 20, "p2", 2);
		const items = [orderItem1];
		const order = new Order("1", "customer1", items);
		order.addItem(orderItem2);
		expect(order.total).toBe(60);
	});

	it("should not throw any errors when calling validate method with valid parameters", () => {
		const orderItem1 = new OrderItem("1", "Item 1", 10, "p1", 2);
		const orderItem2 = new OrderItem("2", "Item 2", 20, "p2", 2);
		const items = [orderItem1, orderItem2];
		const order = new Order("1", "customer1", items);
		expect(() => {
			order.validate();
		}).not.toThrow();
	});

	it("should throw an error when creating an Order instance with no id", () => {
		const orderItem1 = new OrderItem("1", "Item 1", 10, "p1", 2);
		const items = [orderItem1];
		expect(() => {
			new Order("", "customer1", items);
		}).toThrow("ID is required");
	});

	it("should throw an error when creating an Order instance with no customer id", () => {
		const orderItem1 = new OrderItem("1", "Item 1", 10, "p1", 2);
		const items = [orderItem1];
		expect(() => {
			new Order("1", "", items);
		}).toThrow("CustomerId is required");
	});

	it("should throw an error when creating an Order instance with a non-numeric price parameter in an OrderItem", () => {
		expect(() => {
			new Order("1", "customer1", []);
		}).toThrow("Items are required");
	});

	it("should throw an error when quantity is less or equals 0", () => {
		expect(() => {
			const orderItem1 = new OrderItem("1", "Item 1", 10, "p1", 0);
			const items = [orderItem1];
			const order = new Order("1", "customer1", items);
		}).toThrowError("Quantity must be greater than zero");
	});
});
