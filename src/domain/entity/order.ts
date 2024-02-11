import OrderItem from "./order-item";

export default class Order {
	private _total: number;

	constructor(
		readonly id: string,
		readonly customerId: string,
		readonly items: OrderItem[],
	) {
		this._total = this.calculateTotal();
		this.validate();
	}

	get total(): number {
		return this._total;
	}

	validate() {
		if (!this.id) {
			throw new Error("ID is required");
		}
		if (!this.customerId) {
			throw new Error("CustomerId is required");
		}
		if (this.items.length === 0) {
			throw new Error("Items are required");
		}

		if (this.items.some((item) => item.quantity <= 0)) {
			throw new Error("Quantity must be greater than zero");
		}
	}

	addItem(orderItem: OrderItem) {
		this.items.push(orderItem);
		this.calculateTotal();
	}

	calculateTotal(): number {
		const total = this.items.reduce((acc, item) => acc + item.price, 0);
		this._total = total;
		return total;
	}
}
