import { describe, expect, it } from "vitest";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";
import Customer from "../entity/customer";

describe("Order service unit tests", () => {
	it("should place an order", () => {
		const customer = new Customer("c1", "Customer 1");
		const orderItem1 = new OrderItem("i1", "Order 1", 10, "p1", 1);

		const orderService = new OrderService();
		const order = orderService.placeOrder(customer, [orderItem1]);
		expect(customer.rewardPoints).toBe(5);
		expect(order.total).toBe(10);
	});

	it("should throw an error if place order with no items", () => {
		expect(() => {
			const customer = new Customer("c1", "Customer 1");
			const orderService = new OrderService();
			orderService.placeOrder(customer, []);
		}).toThrowError("Order must have at least one item");
	});

	it("should get total of all orders", () => {
		const orderItem1 = new OrderItem("1", "Order 1", 100, "product1", 1);
		const orderItem2 = new OrderItem("2", "Order 2", 200, "product2", 2);
		const order1 = new Order("1", "c1", [orderItem1]);
		const order2 = new Order("2", "c1", [orderItem2]);

		const orderService = new OrderService();
		const total = orderService.total([order1, order2]);
		expect(total).toBe(500);
	});
});
