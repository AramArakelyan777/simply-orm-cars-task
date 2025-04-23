import dealershipService from "../services/dealershipService.js"
import carService from "../services/carService.js"

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
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            })
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
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            })
        }
    }
}

export default new DealershipController()
