import {
	Column,
	DataType,
	Default,
	PrimaryKey,
	Table,
	Model,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import ProductModel from "./product.model";
import OrderModel from "./order.model";

@Table({
	tableName: "orders_items",
	timestamps: false,
})
export default class OrderItemModel extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@ForeignKey(() => ProductModel)
	@Column({ type: DataType.UUID, allowNull: false })
	declare product_id: string;

	@BelongsTo(() => ProductModel)
	declare product: ProductModel;

	@ForeignKey(() => OrderModel)
	@Column({ type: DataType.UUID, allowNull: false })
	declare order_id: string;

	@BelongsTo(() => OrderModel)
	declare order: OrderModel;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare name: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	declare quantity: number;

	@Column({ type: DataType.NUMBER, allowNull: false })
	declare price: number;
}
