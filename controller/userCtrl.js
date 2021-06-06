const Users = require('../model/userModel');
const Posts = require('../model/postModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, password, email, mobile } = req.body;

            const userEmail = await Users.findOne({ email })
            if (userEmail) return res.status(400).json({ msg: "دوست عزیز شما قبلا ثبت نام کرده اید" })
            const userPhone = await Users.findOne({ mobile })
            if (userPhone) return res.status(400).json({ msg: "دوست عزیز من این شماره تماس قبلا ثبت شده است" })

            if (password.length < 6) return res.status(400).json({ msg: "لطفا رمز عبور خود را از 6 کاراکتر بیشتر انتخاب کنید" })

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await Users({
                fullname, password: passwordHash, email, mobile
            })
            // save
            await newUser.save();

            // jsonWebToken
            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })

            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                path: "/user/refresh_token"
            })

            res.json({ accessToken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "شما هنوز ثبت نام نکرده اید" })

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "کاربری با این مشخصات ثبت نشده است" });

            // jsonWebToken
            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                path: "/user/refresh_token"
            })

            res.json({ accessToken })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
            return res.json({ msg: "شما از سایت خارج شدید" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            try {
                const rf_token = req.cookies.refreshtoken;
                if (!rf_token)
                    return res.status(400).json({ msg: "لطفا وارد شوید" })

                jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.status(400).json({ msg: "لطفا وارد شوید" });

                    const accesstoken = createAccessToken({ id: user.id });
                    res.json({ accesstoken })
                })
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            if (!user) return res.status(400).json({ msg: "کاربر پیدا نشد" })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    favAdd: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: 'کاربری با این مشخصات یافت نشد' })

            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                fav: req.body.fav
            })

            return res.json({ msg: "به علاقه مندی ها اضافه شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    favRemove: async (req, res) => {
        try {

            const user = await Users.findById(req.user.id);

            await Users.update(
                { '_id': user.id },
                { $pull: { fav: { _id: req.params.id } } }
            );

            return res.json({ msg: "مطلب مورد نظر از علاقه مندی ها حذف شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllUser: async (req, res) => {
        try {
            const allUser = await Users.find().select("-password");
            res.json({
                result: allUser.length,
                allUser
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    setAdmin: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id);
            user.admin = 1;
            await user.save();
            res.json({ msg: "نوع کاربری عوض شد" });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deleteUser = await Users.findByIdAndDelete(req.params.id);
            if (!deleteUser) return res.status(400).json({ msg: "کاربر مورد نظر یافت نشد" })

            res.json({ msg: "کاربر مورد نظر حذف شد" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}



const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}


module.exports = userCtrl