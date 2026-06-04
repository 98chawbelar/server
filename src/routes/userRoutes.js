const express = require("express");

const router = express.Router();

const {
  getPublicUsers,
  getUsers,
  createUser,
  deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

// public route
router.get("/public", getPublicUsers);

// admin routes
router.get("/", authMiddleware, roleMiddleware("ADMIN"), getUsers);

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createUser);

router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteUser);

module.exports = router;
