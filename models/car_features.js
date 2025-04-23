import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const CarFeatures = sequelize.define(
    "car_features",
    {
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "cars",
                key: "id",
            },
            onDelete: "CASCADE",
            primaryKey: true,
        },
        feature_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "features",
                key: "id",
            },
            onDelete: "CASCADE",
            primaryKey: true,
        },
    },
    { timestamps: false }
)

export default CarFeatures
