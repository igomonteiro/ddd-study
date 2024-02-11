export default class Address {
	constructor(
		readonly street: string,
		readonly number: number,
		readonly zipCode: string,
		readonly city: string,
	) {
		this.validate();
	}

	validate() {
		if (this.street.length === 0) {
			throw new Error("Street is required");
		}
		if (!this.number) {
			throw new Error("Number is required");
		}
		if (this.zipCode.length === 0) {
			throw new Error("Zip is required");
		}
		if (this.city.length === 0) {
			throw new Error("City is required");
		}
	}

	toString() {
		return `${this.street}, ${this.number}, ${this.zipCode} - ${this.city}`;
	}
}
