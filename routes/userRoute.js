import express from 'express'
import {
  getAllUsers,
  getAllTeknisi,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/teknisi", getAllTeknisi);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser); 
router.delete("/users/:id", deleteUser);
router.post("/login", loginUser);

export default router;