export default class OrderItem {
	private _price: number;
	constructor(
		readonly id: string,
		readonly name: string,
		price: number,
		readonly productId: string,
		readonly quantity: number,
	) {
		this._price = price;
	}

	get price(): number {
		return this._price * this.quantity;
	}
}
