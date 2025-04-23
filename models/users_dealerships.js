import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const UsersDealerships = sequelize.define("users_dealership", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    dealership_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "dealerships",
            key: "id",
        },
        onDelete: "CASCADE",
    },
})

export default UsersDealerships
