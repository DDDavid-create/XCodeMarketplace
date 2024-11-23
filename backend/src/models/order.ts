import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface OrderAttributes {
    id: number;
    userId: number;
    products: { product: number; quantity: number }[];
    total: number;
    status: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public userId!: number;
    public products!: { product: number; quantity: number }[];
    public total!: number;
    public status!: string;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        products: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Pending',
        },
    },
    {
        sequelize,
        modelName: 'Order',
    }
);

export default Order;
