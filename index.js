import express from "express"
import dotenv from "dotenv"
import errorMiddleware from "./middleware/errorMiddleware.js"
import sequelize from "./config/db.js"
import router from "./routes/router.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use("/api", router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.sync({
            force: false,
            alter: true,
        })
        app.listen(PORT, () => {
            console.log(`SERVER RUNNING ON PORT ${PORT}.`)
        })
    } catch (err) {
        console.log("DB error:", err)
    }
}

start()
