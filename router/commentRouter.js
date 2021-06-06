const router = require('express').Router();



// CTRL
const commentCtrl = require('../controller/commentCtrl');



router.route("/comment/:id")
    .post(commentCtrl.commentCreate)
    .delete(commentCtrl.commentDelete)

module.exports = router;