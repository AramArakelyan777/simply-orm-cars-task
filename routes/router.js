import { Router } from "express"
import dealershipController from "../controllers/dealershipController.js"
import userController from "../controllers/userController.js"
import carController from "../controllers/carController.js"

const router = Router()

router.post("/create_dealership", dealershipController.createDealership)

router.post("/add_car_to_dealership", dealershipController.addCarToDealership)

router.post("/create_user", userController.createUser)

router.post("/add_user_to_dealership", dealershipController.addUserToDealership)

router.get("/dealerships", dealershipController.getDealerships)

router.get("/dealerships/:dealership_id", dealershipController.getADealership)

router.post("/rating", userController.rateCar)

router.post("/add_feature_to_car", carController.addFeature)

router.delete("/remove_feature_from_car", carController.removeFeature)

export default router
