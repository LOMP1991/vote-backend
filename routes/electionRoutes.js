import express from "express";
import { createElection, getElections } from "../controllers/electionController.js";

const router = express.Router();

router.post("/create", createElection);
router.get("/list", getElections);

export default router;
