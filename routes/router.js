import { Router } from "express"
import dealershipService from "../services/dealershipService.js"

const router = Router()

router.post("/create_dealership", async (req, res) => {
    const { name, address, description } = req.body

    if (!name || !address)
        res.status(400).send({ message: "Name and address are required." })

    const dealership = await dealershipService.createDealership(
        name,
        address,
        description
    )
    res.status(200).send(dealership)
})

export default router
