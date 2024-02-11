import OrderItem from "./order-item";

export default class Order {
	private _id: string;
	private _customerId: string;
	private _items: OrderItem[];
	private _total: number;

	constructor(id: string, customerId: string, items: OrderItem[]) {
		this._id = id;
		this._customerId = customerId;
		this._items = items;
		this._total = this.calculateTotal();
		this.validate();
	}

	get total(): number {
		return this._total;
	}

	validate() {
		if (!this._id) {
			throw new Error("ID is required");
		}
		if (!this._customerId) {
			throw new Error("CustomerId is required");
		}
		if (this._items.length === 0) {
			throw new Error("Items are required");
		}

		if (this._items.some((item) => item.quantity <= 0)) {
			throw new Error("Quantity must be greater than zero");
		}
	}

	addItem(orderItem: OrderItem) {
		this._items.push(orderItem);
		this.calculateTotal();
	}

	calculateTotal(): number {
		const total = this._items.reduce((acc, item) => acc + item.price, 0);
		this._total = total;
		return total;
	}
}
