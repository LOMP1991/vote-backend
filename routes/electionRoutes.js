import express from "express";
import { createElection } from "../controllers/electionController.js";

const router = express.Router();

router.post('/create', createElection);

export default router;