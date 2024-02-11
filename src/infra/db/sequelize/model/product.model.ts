import {
	Column,
	DataType,
	Default,
	PrimaryKey,
	Table,
	Model,
} from "sequelize-typescript";

@Table({
	tableName: "products",
	timestamps: false,
})
export default class ProductModel extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare name: string;

	@Column({ type: DataType.NUMBER, allowNull: false })
	declare price: number;
}
