import Product from "../entity/product";

export default class ProductService {
	increasePrice(products: Product[], percentage: number): void {
		for (const product of products) {
			product.changePrice(product.price + (percentage / 100) * product.price);
		}
	}
}
