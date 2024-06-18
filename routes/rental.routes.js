import { Router } from "express";
import  {createRental, retreiveRental, retreiveRentals, updateRental, deleteRental} from '../controllers/rental.controller.js';

const router = Router();

router.route("/").get(retreiveRentals).post(createRental);
router.route("/:id").get(retreiveRental).patch(updateRental).delete(deleteRental);

export default router;
