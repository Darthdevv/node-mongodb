import { Router } from "express";
import { createCar, retreiveCar, retreiveCars, updateCar, deleteCar, retreiveCarByModel, retreiveAvailableCarsByModel } from '../controllers/car.controller.js';

const router = Router();

router.route("/").get(retreiveCars).post(createCar);
router.route("/:id").get(retreiveCar).patch(updateCar).delete(deleteCar);
router.route('/models/carsByModel').get(retreiveCarByModel);
router.route('/models/carsAvailableByModel').get(retreiveAvailableCarsByModel);

export default router;
