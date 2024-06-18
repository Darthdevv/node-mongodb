import { Router } from "express";
import { getUser, getUsers, registerUser } from "../controllers/user.controller.js";

const router = Router();



router.route('/').get(getUsers).post(registerUser);
router.route('/:id').get(getUser);



export default router;