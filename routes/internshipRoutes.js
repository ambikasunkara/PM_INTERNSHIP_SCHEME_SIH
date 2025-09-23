import express from "express";
import { getInternships } from "../controllers/internshipController.js";

const router = express.Router();

router.get("/", getInternships);

export default router;
