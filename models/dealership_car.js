import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const DealershipCars = sequelize.define("dealership_cars", {
    dealership_id: {
        type: DataTypes.INTEGER,
    },
    car_id: {
        type: DataTypes.INTEGER,
    },
})

export default DealershipCars
