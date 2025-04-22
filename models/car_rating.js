import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const CarRatings = sequelize.define("car_ratings", {
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
