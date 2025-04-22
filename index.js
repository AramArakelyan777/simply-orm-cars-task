import express from "express"
import dotenv from "dotenv"
import errorMiddleware from "./middleware/errorMiddleware.js"
import sequelize from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.sync({
            force: true,
            alter: false,
        })
        app.listen(PORT, () => {
            console.log(`SERVER RUNNING ON PORT ${PORT}.`)
        })
    } catch (err) {
        console.log("Unable to connect to the database:", err)
    }
}

start()
