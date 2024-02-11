import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/model/customer.model";
import OrderModel from "../db/model/order.model";
import OrderItemModel from "../db/model/order-item.model";
import ProductModel from "../db/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order-item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([
			CustomerModel,
			OrderModel,
			OrderItemModel,
			ProductModel,
		]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a new order", async () => {
		const customerRepository = new CustomerRepository();
		const customerId = uuid();
		const customer = new Customer(customerId, "Customer 1");
		const address = new Address("Street 1", 1, "12345-678", "Jaraguá do Sul");
		customer.address = address;
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const productId = uuid();
		const product = new Product(productId, "Product 1", 10);
		await productRepository.create(product);

		const orderItemId = uuid();
		const orderItem = new OrderItem(
			orderItemId,
			product.name,
			product.price,
			product.id,
			2,
		);

		const orderId = uuid();
		const order = new Order(orderId, customerId, [orderItem]);
		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel?.toJSON()).toStrictEqual({
			id: orderId,
			customer_id: customerId,
			total: order.total,
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					order_id: orderId,
					product_id: productId,
				},
			],
		});
	});
});
