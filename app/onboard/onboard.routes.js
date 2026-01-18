import express from "express";
import OnboardController from "./onboard.controller.js";

const router = express.Router();
const controller = new OnboardController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.delete("/:id", controller.delete);

export default router;
