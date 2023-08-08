const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/add-user", userController.getUser);
router.get("/edit-user/:userId", userController.getSingleUser);
router.post("/add-user", userController.postNewUser);
router.delete("/delete-user/:userId", userController.deleteUser);
router.patch("/edit-user/:userId", userController.editUser);
module.exports = router;
