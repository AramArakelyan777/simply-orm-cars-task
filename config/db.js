import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: process.env.DB_DIALECT,
})

export default sequelize
