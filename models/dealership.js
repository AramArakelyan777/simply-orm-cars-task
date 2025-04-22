import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Dealership = sequelize.define(
    "dealerships",
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
    { paranoid: true, timestamps: false }
)

export default Dealership
