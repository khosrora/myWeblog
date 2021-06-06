const router = require('express').Router();



// Middleware 
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// Ctrl
const SuggestBookCtrl = require('../controller/suggestbook');


router.get("/getsuggestbook", SuggestBookCtrl.get)
router.put("/suggestbook/:id", auth, authAdmin, SuggestBookCtrl.edit)


module.exports = router;