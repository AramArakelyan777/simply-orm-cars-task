import Dealership from "../models/dealership.js"

class DealershipService {
    async createDealership(name, address, description) {
        return await Dealership.create({ name, address, description })
    }
}

export default new DealershipService()
