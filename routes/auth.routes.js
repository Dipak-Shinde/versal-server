import express from "express";
import {
  getAllUsers,
  deleteUser,
  bulkDeleteUsers,
  signup,
  login,
  updateProfile
} from "../controllers/auth.controller.js";
import { auth, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/profile", auth, updateProfile);

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.delete("/:id", bulkDeleteUsers);

/* example admin route */
router.get("/admin", auth, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;
