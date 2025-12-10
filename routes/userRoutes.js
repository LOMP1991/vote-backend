import express from 'express';
import { registrarUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', registrarUser);

export default router;