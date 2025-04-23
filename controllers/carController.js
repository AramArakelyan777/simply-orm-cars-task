import carService from "../services/carService.js"
import featureService from "../services/featureService.js"

class CarController {
    async addFeature(req, res) {
        const { feature_id, car_id } = req.body

        if (!feature_id || !car_id)
            return res.status(400).json({
                message: "You must provide both feature id and car id.",
            })

        try {
            const carExists = await carService.doesCarExist(car_id)
            if (!carExists)
                return res.status(404).json({ message: "Car not found." })

            const featureExists = await featureService.doesFeatureExist(
                feature_id
            )
            if (!featureExists)
                return res.status(404).json({ message: "Feature not found." })

            await featureService.addFeature(feature_id, car_id)

            return res
                .status(201)
                .json({ message: "Feature added to car successfully." })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async removeFeature(req, res) {
        const { feature_id, car_id } = req.body

        if (!feature_id || !car_id)
            return res.status(400).json({
                message: "You must provide both feature id and car id.",
            })

        try {
            const carExists = await carService.doesCarExist(car_id)
            if (!carExists)
                return res.status(404).json({ message: "Car not found." })

            const featureExists = await featureService.doesFeatureExist(
                feature_id
            )
            if (!featureExists)
                return res.status(404).json({ message: "Feature not found." })

            await featureService.removeFeature(feature_id, car_id)

            return res
                .status(201)
                .json({ message: "Feature removed from car successfully." })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new CarController()
