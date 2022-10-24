
module.exports = app => {
	const users = require("../controllers/user.controller.js");
	const verifyToken = require("../middlewares/verifyToken.middleware.js");
	var router = require('express').Router();
	router.post("/", verifyToken, users.create);
	router.get("/",  verifyToken, users.findAll);
	router.get("/:id", verifyToken, users.findOne);
	router.put("/:id", verifyToken, users.update);
	router.delete("/:id", verifyToken, users.delete);
	app.use("/api/users",router);
};
