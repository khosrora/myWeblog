const router = require('express').Router();
const multer = require('multer');


// Middleware
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// CTRL
const postCtrl = require('../controller/postCtrl');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ dest: "images/", storage: storage })



router.route("/post")
    .get(postCtrl.getPost)
    .post(auth, authAdmin, upload.single("file"), postCtrl.createpost)

router.route("/post/:id")
    .delete(auth, authAdmin, postCtrl.deletePost)
    .put(auth, authAdmin, upload.single("file"), postCtrl.updatePost)


module.exports = router;