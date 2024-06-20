import { Router } from "express";
import { createCar, retreiveCar, retreiveCars, updateCar, deleteCar, retreiveCarByModel, retreiveAvailableCarsByModel, retreiveAvailableOrRentedByModelCars, retreiveRentedOrSpecificModelCars } from '../controllers/car.controller.js';

const router = Router();

// Car routes
router.route("/").get(retreiveCars).post(createCar);
router.route("/:id").get(retreiveCar).patch(updateCar).delete(deleteCar);

// Special routes
router.route('/models/carsByModel').get(retreiveCarByModel);
router.route('/models/carsAvailableByModel').get(retreiveAvailableCarsByModel);
router.route('/models/carsRentedOrSpecificModelCars').get(retreiveRentedOrSpecificModelCars);
router.route('/models/carsAvailableOrRentedByModelCars').get(retreiveAvailableOrRentedByModelCars);

export default router;
