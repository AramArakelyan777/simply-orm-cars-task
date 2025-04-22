import { DataTypes } from "sequelize"
import sequelize from "../config/db"

const Dealership = sequelize.define(
    "dealership",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100],
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 200],
            },
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    { paranoid: true }
)

export default Dealership
