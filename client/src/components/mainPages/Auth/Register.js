import { useState } from 'react'
import axios from 'axios';


const Register = ({ setLogin }) => {

    const [user, setUser] = useState({
        email: "", password: "", fullname: "", mobile: ""
    })

    const handlePage = () => {
        setLogin(true)
    }
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("/user/register", { ...user })
            localStorage.setItem("firstLogin", true)
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <form onSubmit={registerSubmit}>
            <h3>ثبت نام</h3>
            <p>اطلاعات خود را وارد کنید</p>
            <input
                className="my-2"
                placeholder="نام و نام خانوادگی"
                type="text"
                name="fullname"
                value={user.fullname}
                onChange={onChangeInput}
            />
            <input
                className="my-2"
                placeholder="ایمیل"
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeInput}
            />
            <input
                className="my-2"
                placeholder="کلمه عبور"
                type="password"
                name="password"
                value={user.password}
                onChange={onChangeInput}
            />
            <input className="my-2"
                placeholder="شماره تماس"
                type="Number"
                name="mobile"
                value={user.mobile}
                onChange={onChangeInput}
            />
            <button
                class="btn btn-outline-dark mt-5">
                ثبت نام
            </button>

            <span onClick={handlePage}>ثبت نام کرده ام</span>
        </form>
    )
}

export default Register
