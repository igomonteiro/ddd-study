import { describe, expect, it } from "vitest";
import Product from "../entity/product";
import ProductService from "./product.service";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
	it("should get total of all orders", () => {
		const orderItem1 = new OrderItem("1", "Order 1", 100, "product1", 1);
		const orderItem2 = new OrderItem("2", "Order 2", 200, "product2", 2);
		const order1 = new Order("1", "c1", [orderItem1]);
		const order2 = new Order("2", "c1", [orderItem2]);

		const total = OrderService.total([order1, order2]);

		expect(total).toBe(500);
	});
});
