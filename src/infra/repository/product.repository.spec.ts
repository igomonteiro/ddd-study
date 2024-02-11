import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/model/product.model";
import Product from "../../domain/entity/product";
import { v4 as uuid } from "uuid";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a product", async () => {
		const productRepository = new ProductRepository();
		const productId = uuid();
		const product = new Product(productId, "Product 1", 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({
			where: { id: productId },
		});

		expect(productModel?.toJSON()).toStrictEqual({
			id: productId,
			name: "Product 1",
			price: 100,
		});
	});

	it("should update a product", async () => {
		const productRepository = new ProductRepository();
		const productId = uuid();
		const product = new Product(productId, "Product 1", 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({
			where: { id: productId },
		});

		expect(productModel?.toJSON()).toStrictEqual({
			id: productId,
			name: "Product 1",
			price: 100,
		});

		product.changeName("Product 2");
		product.changePrice(200);

		await productRepository.update(product);
		const productModel2 = await ProductModel.findOne({
			where: { id: productId },
		});

		expect(productModel2?.toJSON()).toStrictEqual({
			id: productId,
			name: "Product 2",
			price: 200,
		});
	});

	it("should find a product", async () => {
		const productRepository = new ProductRepository();
		const productId = uuid();
		const product = new Product(productId, "Product 1", 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({
			where: { id: productId },
		});

		const foundProduct = await productRepository.find(productId);

		expect(productModel?.toJSON()).toStrictEqual({
			id: foundProduct?.id,
			name: foundProduct?.name,
			price: foundProduct?.price,
		});
	});

	it("should find all products", async () => {
		const productRepository = new ProductRepository();
		const product1Id = uuid();
		const product1 = new Product(product1Id, "Product 1", 100);
		await productRepository.create(product1);

		const product2Id = uuid();
		const product2 = new Product(product2Id, "Product 1", 100);
		await productRepository.create(product2);

		const products = [product1, product2];

		const foundProducts = await productRepository.findAll();
		expect(products).toEqual(foundProducts);
	});
});
