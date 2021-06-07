import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

const Login = ({ setLogin }) => {

    const state = useContext(GlobalState)

    const [loading, setLoading] = state.GlobalData.loading;

    const [user, setUser] = useState({
        email: "", password: ""
    })

    const handlePage = () => {
        setLogin(false)
    }
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(!loading)
            await axios.post("/user/login", { ...user })
            localStorage.setItem("firstLogin", true)
            setLoading(false)
            window.location.href = "/"
        } catch (err) {
            alert(err.msg)
        }
    }

    return (
        <form onSubmit={loginSubmit}>
            <h3>ورود به حساب کاربری</h3>
            <p>پست الکترونیک و کلمه عبور خود را وارد کنید</p>
            <input className="my-2"
                placeholder="ایمیل"
                type="text"
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
            <button className="btn btn-outline-dark mt-5" href="">ورود به حساب کاربری</button>
            <span onClick={handlePage}>عضو نیستید؟ ثبت نام کنید</span>
        </form>
    )
}

export default Login
