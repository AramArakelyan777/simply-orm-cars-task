import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const DealershipCars = sequelize.define(
    "dealership_cars",
    {
        dealership_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "dealerships",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "cars",
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["dealership_id", "car_id"],
            },
        ],
    }
)

export default DealershipCars
