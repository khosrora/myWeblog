const Posts = require('../model/postModel');


const commentCtrl = {
    commentCreate: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await Posts.findById(id)
            if (!post) return res.status(400).send("مطلب مورد نظر پیدا نشد")

            const comment = {
                user: req.body.user,
                text: req.body.text,
                score: req.body.score
            }

            post.comment.push(comment)
            await post.save()
            res.json({ msg: "نظر با موفقیت اضافه شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    commentDelete: async (req, res) => {
        try {

            const post = await Posts.findById(req.params.id);
            if (!post) return res.status(400).json({ msg: "مطلب مورد نظر پیدا نشد" })

            const { commentId } = req.body
            const comment = await post.comment.id(commentId);
            if (!comment) return res.status(400).json({ msg: "نظر مورد نظر پیدا نشد" })

            comment.remove();
            await post.save();

            res.json({ msg: "نظر با موفقیت حذف شد " })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = commentCtrl;