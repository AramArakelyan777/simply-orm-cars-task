import Car from "./car.js"
import Feature from "./feature.js"
import Model from "./model.js"
import Make from "./make.js"
import Dealership from "./dealership.js"
import User from "./user.js"
import UsersDealerships from "./users_dealerships.js"

Car.belongsTo(Model, { foreignKey: "model_id" })

Model.hasMany(Car, { foreignKey: "model_id" })

Model.hasOne(Make, { foreignKey: "id", sourceKey: "make_id" })

Car.belongsToMany(Feature, {
    through: "car_features",
    foreignKey: "car_id",
    timestamps: false,
})

Feature.belongsToMany(Car, {
    through: "car_features",
    foreignKey: "feature_id",
    timestamps: false,
})

Dealership.hasMany(User, {
    through: "users_dealership",
    foreignKey: "dealership_id",
})

Dealership.belongsToMany(Car, {
    through: "dealership_cars",
    foreignKey: "dealership_id",
})

Car.belongsToMany(Dealership, {
    through: "dealership_cars",
    foreignKey: "car_id",
})

User.belongsToMany(Dealership, {
    through: UsersDealerships,
    foreignKey: "user_id",
    timestamps: false,
})

Dealership.belongsToMany(User, {
    through: UsersDealerships,
    foreignKey: "dealership_id",
    timestamps: false,
})
