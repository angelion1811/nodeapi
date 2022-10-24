module.exports = app => {
	const authValidator = require("../validators/auth.validator.js");
	const authController = require("../controllers/auth.controller.js");
    const verifyToken = require("../middlewares/verifyToken.middleware.js");
	var router = require('express').Router();
	router.get("/profile",verifyToken, authController.profile);
	router.post("/login", authValidator.login, authController.login);
	router.post("/register", authValidator.register, authController.register);
	app.use("/api/auth",router);
};