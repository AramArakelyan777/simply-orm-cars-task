import { Router } from "express"
import dealershipController from "../controllers/dealershipController.js"
import userController from "../controllers/userController.js"

const router = Router()

router.post("/create_dealership", dealershipController.createDealership)

router.post("/add_car_to_dealership", dealershipController.addCarToDealership)

router.post("/create_user", userController.createUser)

router.post("/add_user_to_dealership", dealershipController.addUserToDealership)

router.get("/dealerships", dealershipController.getDealerships)

router.get("/dealerships/:dealership_id", dealershipController.getADealership)

router.post("/rating", userController.rateCar)

export default router
