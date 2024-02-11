import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/model/customer.model";
import Customer from "../../domain/entity/customer";
import { v4 as uuid } from "uuid";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a customer", async () => {
		const customerRepository = new CustomerRepository();
		const customerId = uuid();
		const customer = new Customer(customerId, "Customer 1");
		const address = new Address("Street 1", 1, "89251390", "Jaraguá do Sul");
		customer.address = address;

		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id: customerId },
		});

		expect(customerModel?.toJSON()).toStrictEqual({
			id: customerId,
			name: "Customer 1",
			active: customer.isActive(),
			reward_points: customer.rewardPoints,
			street: address.street,
			number: address.number,
			zip_code: address.zipCode,
			city: address.city,
		});
	});

	it("should update a customer", async () => {
		const customerRepository = new CustomerRepository();
		const customerId = uuid();
		const customer = new Customer(customerId, "Customer 1");
		const address = new Address("Street 1", 1, "89251390", "Jaraguá do Sul");
		customer.address = address;

		await customerRepository.create(customer);

		customer.changeName("Customer 2");

		await customerRepository.update(customer);
		const customerModel = await CustomerModel.findOne({
			where: { id: customerId },
		});

		expect(customerModel?.toJSON()).toStrictEqual({
			id: customerId,
			name: "Customer 2",
			active: customer.isActive(),
			reward_points: customer.rewardPoints,
			street: address.street,
			number: address.number,
			zip_code: address.zipCode,
			city: address.city,
		});
	});

	it("should find a customer", async () => {
		const customerRepository = new CustomerRepository();
		const customerId = uuid();
		const customer = new Customer(customerId, "Customer 1");
		const address = new Address("Street 1", 1, "89251390", "Jaraguá do Sul");
		customer.address = address;

		await customerRepository.create(customer);

		const foundCustomer = await customerRepository.find(customerId);

		expect(customer).toStrictEqual(foundCustomer);
	});

	it("should throw an error when customer is not found", async () => {
		const customerRepository = new CustomerRepository();

		expect(async () => {
			await customerRepository.find("456ABC");
		}).rejects.toThrow("Customer not found");
	});

	it("should find all customers", async () => {
		const customerRepository = new CustomerRepository();
		const customer1Id = uuid();
		const customer1 = new Customer(customer1Id, "Customer 1");
		const address1 = new Address("Street 1", 1, "89251390", "Jaraguá do Sul");
		customer1.address = address1;
		customer1.addRewardPoints(10);
		await customerRepository.create(customer1);

		const customer2Id = uuid();
		const customer2 = new Customer(customer2Id, "Customer 1");
		const address2 = new Address("Street 1", 1, "89251390", "Jaraguá do Sul");
		customer2.address = address2;
		customer2.addRewardPoints(20);
		await customerRepository.create(customer2);

		const foundCustomers = await customerRepository.findAll();
		expect(foundCustomers).toHaveLength(2);
		expect(foundCustomers).toContainEqual(customer1);
		expect(foundCustomers).toContainEqual(customer2);
	});
});
