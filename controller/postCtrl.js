const Posts = require('../model/postModel');
const { unlink } = require('fs/promises');

// filter , sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const postCtrl = {
    getPost: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find(), req.query)
                .filtering().sorting().paginating()

            const post = await features.query;

            res.json({
                status: "success",
                result: post.length,
                post: post
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createpost: async (req, res) => {
        try {
            const { name, desc, subject, category } = req.body;
            const images = `${req.file.path}`;
            const post = await Posts.findOne({ subject })
            if (post) res.status(400).json({ msg: "مطلب مورد نظر قبلا ثبت شده است" })

            const newpost = new Posts({
                name, desc, subject, images, category
            })
            await newpost.save();
            res.json({
                msg: "مطلب با موفقیت ایجاد شد",
                newpost
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deletePost: async (req, res) => {
        try {
            const id = req.params.id;
            const oldpost = await Posts.findByIdAndDelete(id);
            await unlink(oldpost.images);
            res.json({ msg: "دسته با موفقیت حذف شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePost: async (req, res) => {
        try {
            const { name, desc, subject, category } = req.body;
            const images = `${req.file.path}`;

            if (!images) return res.status(400).json({ msg: 'لطفا یک عکس انتخاب کنید' })
            const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                name, desc, subject, images, category
            })
            await post.save();
            res.json({ msg: " مطلب با موفقیت بروز شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = postCtrl;