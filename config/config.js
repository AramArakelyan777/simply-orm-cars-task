import dotenv from "dotenv"

dotenv.config()

export default {
    development: {
        url: process.env.DB_URL,
        dialect: process.env.DB_DIALECT,
    },
}
