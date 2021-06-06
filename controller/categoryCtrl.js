const Category = require('../model/categoryModel');



const categoryCtrl = {
    getCategory: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category) res.status(400).json({ msg: "دسته مورد نظر قبلا ثبت شده است" })

            const newCategory = new Category({
                name
            })
            await newCategory.save();
            res.json({ msg: "دسته با موفقیت ایجاد شد" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            await Category.findByIdAndDelete(id)
            res.json({ msg: "دسته با موفقیت حذف شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findByIdAndUpdate({ _id: req.params.id }, { name })
            res.json({ msg: "دسته بندی با موفقیت بروز شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = categoryCtrl;