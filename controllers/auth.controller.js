import {
  signupUser,
  loginUser,
  updateUser
} from "../services/auth.services.js";
import User from "../models/auth.model.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // include is_active
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// controller
export const bulkDeleteUsers = async (req, res) => {
  try {
    await User.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: "Users deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Bulk delete failed" });
  }
};

/* SIGNUP */
export const signup = async (req, res, next) => {
  try {
    const user = await signupUser(req.body);
    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

/* LOGIN */
export const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body);

    // ✅ mark user as active (logged in)
    user.is_active = true;
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
          is_active: user.is_active,
      }
    });
  } catch (err) {
    next(err);
  }
};

 /* logout */

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      is_active: false
    });

    res.json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res, next) => {
  try {
    const user = await updateUser(req.userId, req.body);
    res.json({ message: "Profile updated", user });
  } catch (err) {
    next(err);
  }
};
