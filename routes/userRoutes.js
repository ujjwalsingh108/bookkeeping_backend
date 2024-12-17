const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// PARAM MIDDLEWARE
router.param("id", (req, res, next, val) => {
  console.log(`User id is: ${val}`);
  next();
});

//AUTHENTICATION
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

//GET USER
router.route("/:id").get(userController.getUser);
router.route("/").get(authController.protect, userController.getAllUsers);

module.exports = router;
