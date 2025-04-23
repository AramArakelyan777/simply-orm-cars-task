import userService from "../services/userService.js"

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
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            })
        }
    }
}

export default new UserController()
