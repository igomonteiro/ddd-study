import Address from "./Address";

export default class Customer {
	private _id: string;
	private _name: string;
	private _address!: Address;
	private _active = false;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
		this.validate();
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	isActive(): boolean {
		return this._active;
	}

	validate() {
		if (!this._id) {
			throw new Error("ID is required");
		}
		if (!this._name) {
			throw new Error("Name is required");
		}
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	activate() {
		if (!this._address) {
			throw new Error("Address is mandatory to activate a customer");
		}
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	set address(address: Address) {
		this._address = address;
	}
}
