import { Router } from "express"
import dealershipController from "../controllers/dealershipController.js"

const router = Router()

router.post("/create_dealership", dealershipController.createDealership)

router.post("/add_car_to_dealership", dealershipController.addCarToDealership)

export default router
