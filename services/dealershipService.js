import Dealership from "../models/dealership.js"
import DealershipCars from "../models/dealership_car.js"
import UsersDealerships from "../models/users_dealerships.js"
import sequelize from "../config/db.js"
import { QueryTypes } from "sequelize"

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

    async getADealership(dealershipId) {
        try {
            const dealershipQuery = `
                SELECT 
                    dealerships.id,
                    dealerships.name,
                    dealerships.address,
                    dealerships.description,
                    cars.id AS car_id,
                    cars.price,
                    cars.year,
                    cars.vin,
                    models.name AS model_name,
                    makes.name AS make_name,
                    COALESCE(AVG(car_ratings.rate), 0) AS average_rating
                FROM dealerships
                LEFT JOIN dealership_cars ON dealership_cars.dealership_id = dealerships.id
                LEFT JOIN cars ON cars.id = dealership_cars.car_id
                LEFT JOIN models ON cars.model_id = models.id
                LEFT JOIN makes ON models.make_id = makes.id
                LEFT JOIN car_ratings ON car_ratings.car_id = cars.id
                WHERE dealerships.id = :dealershipId
                GROUP BY dealerships.id, cars.id, models.name, makes.name
                ORDER BY cars.id;
            `

            const dealershipData = await sequelize.query(dealershipQuery, {
                replacements: { dealershipId },
                type: QueryTypes.SELECT,
            })

            if (!dealershipData.length) {
                return { message: "Dealership not found" }
            }

            const usersQuery = `
                SELECT 
                    users.id AS user_id,
                    users.name AS user_name,
                    users.email AS user_email
                FROM users
                JOIN users_dealerships ON users_dealerships.user_id = users.id
                WHERE users_dealerships.dealership_id = :dealershipId;
            `

            const usersData = await sequelize.query(usersQuery, {
                replacements: { dealershipId },
                type: QueryTypes.SELECT,
            })

            const ratingsQuery = `
                SELECT 
                    car_ratings.car_id,
                    car_ratings.rate,
                    users.name AS user_name
                FROM car_ratings
                JOIN users ON car_ratings.user_id = users.id
                WHERE car_ratings.car_id IN (
                    SELECT car_id FROM dealership_cars WHERE dealership_id = :dealershipId
                );
            `

            const ratingsData = await sequelize.query(ratingsQuery, {
                replacements: { dealershipId },
                type: QueryTypes.SELECT,
            })

            const dealership = {
                id: dealershipData[0].id,
                name: dealershipData[0].name,
                address: dealershipData[0].address,
                description: dealershipData[0].description,
                cars: dealershipData.map((car) => ({
                    car_id: car.car_id,
                    price: car.price,
                    year: car.year,
                    vin: car.vin,
                    model_name: car.model_name,
                    make_name: car.make_name,
                    average_rating: car.average_rating,
                    ratings: ratingsData
                        .filter((rating) => rating.car_id === car.car_id)
                        .map((rating) => ({
                            user_name: rating.user_name,
                            rating: rating.rate,
                        })),
                })),
                users: usersData.map((user) => ({
                    user_id: user.user_id,
                    user_name: user.user_name,
                    user_email: user.user_email,
                })),
            }

            return dealership
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default new DealershipService()
