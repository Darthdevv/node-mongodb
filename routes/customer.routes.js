import { Router } from "express";
import { deleteCustomer, retreiveCustomer, retreiveCustomers, registerCustomer, updateCustomer } from "../controllers/customer.controller.js";

const router = Router();



router.route('/').get(retreiveCustomers).post(registerCustomer);
router.route('/:id').get(retreiveCustomer).patch(updateCustomer).delete(deleteCustomer);



export default router;