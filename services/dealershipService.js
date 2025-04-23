import Car from "../models/car.js"
import CarRatings from "../models/car_rating.js"
import Dealership from "../models/dealership.js"
import DealershipCars from "../models/dealership_car.js"
import User from "../models/user.js"
import UsersDealerships from "../models/users_dealerships.js"
import Feature from "../models/feature.js"
import Make from "../models/make.js"
import Model from "../models/model.js"
import sequelize from "../config/db.js"

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

    async getDealerships() {
        return await Dealership.findAll({
            attributes: [
                "id",
                "name",
                "address",
                "description",
                [
                    sequelize.literal(
                        "(SELECT COUNT(*) FROM dealership_cars WHERE dealership_cars.dealership_id = dealerships.id)"
                    ),
                    "car_count",
                ],
            ],
            order: [[sequelize.literal("car_count"), "DESC"]],
            paranoid: false,
        })
    }

    async getADealership(dealership_id) {
        return await Dealership.findByPk(dealership_id, {
            attributes: ["id", "name", "address", "description"],
            include: [
                {
                    model: User,
                    through: { attributes: [] },
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Car,
                    through: { attributes: [] },
                    attributes: ["id", "price", "year", "vin"],
                    include: [
                        {
                            model: Model,
                            attributes: ["name"],
                            include: [
                                {
                                    model: Make,
                                    attributes: ["name"],
                                },
                            ],
                        },
                        {
                            model: Feature,
                            through: { attributes: [] },
                            attributes: ["id", "name"],
                        },
                        {
                            model: CarRatings,
                            attributes: [
                                [
                                    sequelize.fn(
                                        "AVG",
                                        sequelize.col("Cars->Ratings.rate")
                                    ),
                                    "avg_rating",
                                ],
                            ],
                        },
                        {
                            model: CarRatings,
                            include: [
                                {
                                    model: User,
                                    attributes: ["name"],
                                },
                            ],
                            attributes: ["rate"],
                        },
                    ],
                },
            ],
            paranoid: false,
        })
    }
}

export default new DealershipService()
