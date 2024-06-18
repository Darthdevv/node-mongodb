import { Router } from "express";
import { deleteUser, retreiveUser, retreiveUsers, registerUser, updateUser } from "../controllers/user.controller.js";

const router = Router();



router.route('/').get(retreiveUsers).post(registerUser);
router.route('/:id').get(retreiveUser).patch(updateUser).delete(deleteUser);



export default router;