import {
	Column,
	DataType,
	Default,
	PrimaryKey,
	Table,
	Model,
} from "sequelize-typescript";

@Table({
	tableName: "customers",
	timestamps: false,
})
export default class CustomerModel extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare name: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare street: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	declare number: number;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare zip_code: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare city: string;

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	declare active: boolean;

	@Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
	declare reward_points: number;
}
