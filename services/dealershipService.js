import Dealership from "../models/dealership.js"
import DealershipCars from "../models/dealership_car.js"
import UsersDealerships from "../models/users_dealerships.js"

class DealershipService {
    async createDealership(name, address, description) {
        return await Dealership.create({ name, address, description })
    }

    async addCar(dealership_id, car_id) {
        return await DealershipCars.create({ dealership_id, car_id })
    }

    async doesDealershipExist(dealership_id) {
        const count = await Dealership.count({ where: { id: dealership_id } })
        return count > 0
    }

    async addUserToDealership(user_id, dealership_id) {
        return await UsersDealerships.create({ user_id, dealership_id })
    }
}

export default new DealershipService()
