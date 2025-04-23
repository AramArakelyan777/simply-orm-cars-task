import Car from "../models/car.js"

class CarService {
    async doesCarExist(car_id) {
        const count = await Car.count({ where: { id: car_id } })
        return count > 0
    }
}

export default new CarService()
