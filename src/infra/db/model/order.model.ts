import {
	Column,
	DataType,
	Default,
	PrimaryKey,
	Table,
	Model,
	ForeignKey,
	BelongsTo,
	HasMany,
	Sequelize,
} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
	tableName: "orders",
	timestamps: false,
})
export default class OrderModel extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@ForeignKey(() => CustomerModel)
	@Column({ type: DataType.UUID, allowNull: false })
	declare customer_id: string;

	@BelongsTo(() => CustomerModel)
	declare customer: CustomerModel;

	@HasMany(() => OrderItemModel)
	declare items: OrderItemModel[];

	@Column({ type: DataType.NUMBER, allowNull: false })
	declare total: number;
}
