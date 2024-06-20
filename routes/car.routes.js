import { Router } from "express";
import { createCar, retreiveCar, retreiveCars, updateCar, deleteCar, retreiveCarByModel } from '../controllers/car.controller.js';

const router = Router();

router.route("/").get(retreiveCars).post(createCar);
router.route("/:id").get(retreiveCar).patch(updateCar).delete(deleteCar);
router.route('/models/carsByModel').get(retreiveCarByModel);

export default router;
