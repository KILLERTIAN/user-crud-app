import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.delete("/:id", deleteUser);
router.get("/single/:id", getUser);
router.get("/", getUsers);

export default router;
