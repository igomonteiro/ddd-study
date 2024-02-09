import Address from "./Address";
import Customer from "./Customer";
import { describe, expect, it } from "vitest";

describe("Customer unit tests", () => {
	it("should create a new Customer with valid id and name", () => {
		const customer = new Customer("123", "John Doe");
		expect(customer.id).toBe("123");
		expect(customer.name).toBe("John Doe");
		expect(customer.isActive()).toBe(false);
	});

	it("should change the name of a Customer with valid name without throwing an error", () => {
		const customer = new Customer("123", "John Doe");
		customer.changeName("Jane Smith");
		expect(customer.name).toBe("Jane Smith");
	});

	it("should activate a Customer with a valid address and set the active flag to true", () => {
		const customer = new Customer("123", "John Doe");
		const address = new Address("Main St", 123, "12345", "City");
		customer.address = address;
		customer.activate();
		expect(customer.isActive()).toBe(true);
	});

	it("should deactiva a Customer", () => {
		const customer = new Customer("123", "John Doe");
		customer.deactivate();
		expect(customer.isActive()).toBe(false);
	});

	it("should throw an error when address is undefined when you activate a customer", () => {
		expect(() => {
			const customer = new Customer("123", "John Doe");
			customer.activate();
		}).toThrowError("Address is mandatory to activate a customer");
	});

	it("should throw an error when creating a new Customer with an empty id", () => {
		expect(() => {
			new Customer("", "John Doe");
		}).toThrowError("ID is required");
	});

	it("should throw an error when changing the name of a Customer with an empty name", () => {
		const customer = new Customer("123", "John Doe");
		expect(() => {
			customer.changeName("");
		}).toThrowError("Name is required");
	});
});
