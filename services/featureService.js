import Feature from "../models/feature.js"
import CarFeatures from "../models/car_features.js"

class FeatureService {
    async doesFeatureExist(feature_id) {
        const count = await Feature.count({ where: { id: feature_id } })
        return count > 0
    }

    async addFeature(feature_id, car_id) {
        return await CarFeatures.create({ car_id, feature_id })
    }

    async removeFeature(feature_id, car_id) {
        return await CarFeatures.destroy({ where: { car_id, feature_id } })
    }
}

export default new FeatureService()
