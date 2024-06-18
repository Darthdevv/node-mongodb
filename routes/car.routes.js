import { Router } from "express";
import { createCar, retreiveCar, retreiveCars, updateCar, deleteCar } from '../controllers/car.controller.js';

const router = Router();

router.route("/").get(retreiveCars).post(createCar);
router.route("/:id").get(retreiveCar).patch(updateCar).delete(deleteCar);

export default router;
