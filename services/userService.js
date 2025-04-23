import User from "../models/user.js"

class UserService {
    async createUser(name, age, email) {
        return await User.create({ name, age, email })
    }
}

export default new UserService()
