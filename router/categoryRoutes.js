const router = require('express').Router();

// Middleware
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


// CTRL
const categoryCtrl = require('../controller/categoryCtrl');

router.route("/category")
    .get(categoryCtrl.getCategory)
    .post(auth, authAdmin, categoryCtrl.createCategory)

router.route("/category/:id")
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(auth, authAdmin, categoryCtrl.updateCategory)


module.exports = router;