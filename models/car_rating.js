import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const CarRatings = sequelize.define("car_ratings", {
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "cars",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    rate: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
            min: 0,
            max: 5,
        },
    },
})

export default CarRatings
