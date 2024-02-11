import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			active: entity.isActive(),
			reward_points: entity.rewardPoints,
			street: entity.address.street,
			number: entity.address.number,
			zip_code: entity.address.zipCode,
			city: entity.address.city,
		});
	}
	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				street: entity.address.street,
				number: entity.address.number,
				zip_code: entity.address.zipCode,
				city: entity.address.city,
				active: entity.isActive(),
				reward_points: entity.rewardPoints,
			},
			{
				where: {
					id: entity.id,
				},
			},
		);
	}
	async find(id: string): Promise<Customer | null> {
		let customerModel: CustomerModel;
		try {
			customerModel = await CustomerModel.findOne({
				where: { id },
				rejectOnEmpty: true,
			});
		} catch (err) {
			throw new Error("Customer not found");
		}
		const customer = new Customer(id, customerModel.name);
		customer.addRewardPoints(customerModel.reward_points);
		const address = new Address(
			customerModel.street,
			customerModel.number,
			customerModel.zip_code,
			customerModel.city,
		);
		customer.address = address;
		return customer;
	}
	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll();
		const customers = customerModels.map((customerModel) => {
			const customer = new Customer(customerModel.id, customerModel.name);
			customer.addRewardPoints(customerModel.reward_points);
			const address = new Address(
				customerModel.street,
				customerModel.number,
				customerModel.zip_code,
				customerModel.city,
			);
			customer.address = address;
			if (customerModel.active) {
				customer.activate();
			}
			return customer;
		});
		return customers;
	}
}
