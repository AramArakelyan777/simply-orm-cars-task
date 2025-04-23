import User from "../models/user.js"
import CarRatings from "../models/car_rating.js"

class UserService {
    async createUser(name, age, email) {
        return await User.create({ name, age, email })
    }

    async doesUserExist(user_id) {
        const count = await User.count({ where: { id: user_id } })
        return count > 0
    }

    async rateCar(car_id, user_id, rate) {
        return await CarRatings.create({ car_id, user_id, rate })
    }
}

export default new UserService()
