const SuggestBook = require('../model/SuggestBook');



const SuggestBookCtrl = {
    get: async (req, res) => {
        try {
            const suggestbook = await SuggestBook.find()
            return res.json(suggestbook)

        } catch (err) {
            return res.status(500).json({ msg: err.msg })
        }
    },
    edit: async (req, res) => {
        try {
            const { description, title } = req.body;

            const newSuggestBook = await SuggestBook.findByIdAndUpdate({ _id: req.params.id }, {
                description, title
            })

            await newSuggestBook.save();

            return res.json({ msg: "معرفی کتاب با موفقیت ویرایش شد" })

        } catch (err) {
            return res.status(500).json({ msg: err.msg })
        }
    },
}


module.exports = SuggestBookCtrl;