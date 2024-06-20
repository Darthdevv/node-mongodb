import { Router } from "express";
import { createRental, retreiveRental, retreiveRentals, updateRental, deleteRental } from '../controllers/rental.controller.js';
import authHandler from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/").get(retreiveRentals).post(authHandler, createRental);
router.route("/:id").get(retreiveRental).patch(authHandler, updateRental).delete(authHandler, deleteRental);

export default router;
