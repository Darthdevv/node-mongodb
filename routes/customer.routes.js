import { Router } from "express";
import { deleteCustomer, retreiveCustomer, retreiveCustomers, registerCustomer, updateCustomer, loginCustomer } from "../controllers/customer.controller.js";
import authHandler from "../middlewares/auth.middleware.js";

const router = Router();



router.route('/').get(retreiveCustomers);
router.route('/register').post(registerCustomer);
router.route('/login').post(loginCustomer)
router.route('/:id').get(retreiveCustomer).patch(authHandler, updateCustomer).delete( authHandler, deleteCustomer);



export default router;