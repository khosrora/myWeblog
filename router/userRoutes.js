const router = require('express').Router();

// Middleware
const auth = require('../middleware/auth');

//CTRL 
const userCtrl = require('../controller/userCtrl');



router.post("/register", userCtrl.register)
router.post("/login", userCtrl.login)
router.get("/logout", userCtrl.logout)
router.get("/infor", auth, userCtrl.getUser)
router.get("/refresh_token", userCtrl.refreshToken)
router.patch("/addfav", auth, userCtrl.favAdd)
router.put("/removefav/:id", auth, userCtrl.favRemove)



router.get("/alluser", userCtrl.getAllUser);
router.get("/setadmin/:id", userCtrl.setAdmin);
router.delete("/deleteUser/:id", userCtrl.deleteUser);


module.exports = router;