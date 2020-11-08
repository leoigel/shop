const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {auth,admin} = require("../middlewares/auth");


router.post("/", userController.createUser);
router.get('/',auth ,admin, userController.getAllUsers);
router.post("/login", userController.authUser);
router.get("/profile", auth, userController.getUserProfile);
router.put("/profile", auth, userController.updateUserProfile);
router.put("/:id", auth, userController.updateUser);
router.delete('/:id',auth ,admin, userController.deleteUser);
router.get('/:id',auth ,admin, userController.getUserById);



module.exports = router;
