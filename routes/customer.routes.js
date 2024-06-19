import { Router } from "express";
import { deleteCustomer, retreiveCustomer, retreiveCustomers, registerCustomer, updateCustomer, loginCustomer } from "../controllers/customer.controller.js";

const router = Router();



router.route('/').get(retreiveCustomers);
router.route('/register').post(registerCustomer);
router.route('/login').post(loginCustomer)
router.route('/:id').get(retreiveCustomer).patch(updateCustomer).delete(deleteCustomer);



export default router;