import dealershipService from "../services/dealershipService.js"
import carService from "../services/carService.js"
import userService from "../services/userService.js"

class DealershipController {
    async createDealership(req, res) {
        const { name, address, description } = req.body

        if (!name || !address) {
            return res
                .status(400)
                .json({ message: "Name and address are required." })
        }

        try {
            await dealershipService.createDealership(name, address, description)

            return res.status(201).json({
                message: "Dealership created successfully.",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async addCarToDealership(req, res) {
        const { car_id, dealership_id } = req.body

        if (!car_id || !dealership_id) {
            return res.status(400).json({
                message: "Please provide both car id and dealership id.",
            })
        }

        try {
            const carExists = await carService.doesCarExist(car_id)
            if (!carExists) {
                return res.status(404).json({ message: "Car not found." })
            }

            const dealershipExists =
                await dealershipService.doesDealershipExist(dealership_id)
            if (!dealershipExists) {
                return res
                    .status(404)
                    .json({ message: "Dealership not found." })
            }

            await dealershipService.addCar(dealership_id, car_id)

            return res.status(201).json({
                message: "Car added to dealership successfully.",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async addUserToDealership(req, res) {
        const { user_id, dealership_id } = req.body

        if (!user_id || !dealership_id)
            return res.status(400).json({
                message: "You must provide both user id and dealership id.",
            })

        try {
            const userExists = await userService.doesUserExist(user_id)
            if (!userExists)
                return res.status(404).json({ message: "User not found" })

            const dealershipExists =
                await dealershipService.doesDealershipExist(dealership_id)
            if (!dealershipExists) {
                return res
                    .status(404)
                    .json({ message: "Dealership not found." })
            }

            await dealershipService.addUserToDealership(user_id, dealership_id)

            return res.status(201).json({
                message: "User added to dealership successfully.",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async getDealerships(req, res) {
        try {
            const dealerships = await dealershipService.getDealerships()

            return res.status(200).json({
                message: "Dealerships fetched successfully.",
                dealerships,
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async getADealership(req, res) {
        const { dealership_id } = req.params

        try {
            const dealership = await dealershipService.getADealership(
                dealership_id
            )

            if (!dealership) {
                return res
                    .status(404)
                    .json({ message: "Dealership not found." })
            }

            return res.status(200).json({
                message: "Dealership fetched successfully.",
                dealership,
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new DealershipController()
