import { DataTypes } from "sequelize"
import sequelize from "../config/db"

const UsersDealerships = sequelize.define("users_dealership", {
    user_id: {
        type: DataTypes.INTEGER,
    },
    dealership_id: {
        type: DataTypes.INTEGER,
    },
})

export default UsersDealerships
