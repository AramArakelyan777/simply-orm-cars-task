import User from "../models/user.js"

class UserService {
    async createUser(name, age, email) {
        return await User.create({ name, age, email })
    }

    async doesUserExist(user_id) {
        const count = await User.count({ where: { id: user_id } })
        return count > 0
    }
}

export default new UserService()
