import express from "express"
import dotenv from "dotenv"
import errorMiddleware from "./middleware/errorMiddleware.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(errorMiddleware)

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}.`)
        })
    } catch (error) {
        console.log("Error:", error)
    }
}

start()
