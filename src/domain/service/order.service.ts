import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { v4 as uuid } from "uuid";

export default class OrderService {
	placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
		if (!orderItems.length) {
			throw new Error("Order must have at least one item");
		}

		const order = new Order(uuid(), customer.id, orderItems);
		customer.addRewardPoints(order.total / 2);
		return order;
	}
	total(orders: Order[]): number {
		return orders.reduce((acc, order) => acc + order.total, 0);
	}
}
