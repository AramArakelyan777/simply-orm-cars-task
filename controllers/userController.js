import userService from "../services/userService.js"
import carService from "../services/carService.js"

class UserController {
    async createUser(req, res) {
        const { name, age, email } = req.body

        if (!name || !email) {
            return res
                .status(400)
                .json({ message: "Name and email are required." })
        }

        try {
            await userService.createUser(name, age, email)

            return res.status(201).json({
                message: "User created successfully.",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async rateCar(req, res) {
        const { car_id, user_id, rate } = req.body

        if (!car_id || !user_id)
            return res.status(400).json({
                message: "Please provide both car id and the user id.",
            })

        if (!rate && rate !== 0)
            return res
                .status(400)
                .json({ message: "You have not rated the car." })

        if (rate < 0 || rate > 5)
            return res
                .status(400)
                .json({ message: "The rating range must be between 0 and 5." })

        try {
            const userExists = await userService.doesUserExist(user_id)
            if (!userExists)
                return res.status(404).json({ message: "User not found." })

            const carExists = await carService.doesCarExist(car_id)
            if (!carExists)
                return res.status(404).json({ message: "Car not found." })

            await userService.rateCar(car_id, user_id, rate)

            return res.status(201).json({ message: "Rating successful." })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new UserController()
