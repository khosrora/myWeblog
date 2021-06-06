import { useContext } from 'react'
import { GlobalState } from './../../GlobalState';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Filter from './Filter';

const Header = () => {



    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [fav] = state.userAPI.fav;
    const [avatar] = state.userAPI.avatar;
    const [name] = state.userAPI.name;

    const [sort, setSort] = state.PostsAPI.sort;


    const logoutUser = async () => {
        await axios.get("/user/logout")
        localStorage.clear();
        setIsAdmin(false)
        setIsLogged(false)
    }


    const adminRouter = () => {
        return (
            <>
                <li className="nav-item"><h5 className="nav-link ml-5">{name} عزیز خوش آمدید</h5></li>
                <li className="nav-item"><Link className="nav-link" rel="stylesheet" to="/createpost">ارسال پست</Link></li>
                <li className="nav-item"><Link className="nav-link" rel="stylesheet" to="/category">ساخت دسته بندی</Link></li>
                <li className="nav-item"><Link className="nav-link" rel="stylesheet" to="/getusers">کاربران</Link></li>
                <li className="nav-item"><Link className="nav-link" rel="stylesheet" to="/suggestbook/60b3a1697cab342c9c239b08">پیشنهاد کتاب</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li className="nav-item"><Link className="nav-link" to="/addfav">ذخیره شده ها
                <span className="badge bg-danger">{fav.length}</span></Link></li>
                <li className="nav-item"><Link className="nav-link" to="/history">حساب کاربری</Link></li>
                <li className="nav-item"><Link className="nav-link" to="#!" onClick={logoutUser}>خروج</Link></li>
                <li className="nav-item"><img className="avatar-user img-fluid rounded-circle" src={avatar} alt={name} /></li>
            </>
        )
    }



    return (
        <>
            <header className="pt-3">
                <div className="container">
                    <Link className="type navbar-brand text-dark" to='/' >
                        {isAdmin ? "شما به عنوان مدیر وارد شدید" : "وبلاگ من"}
                    </Link>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                {isAdmin && adminRouter()}
                                {
                                    isLogged ? loggedRouter() : <li className="nav-item"><Link className="nav-link" to="/auth">ثبت نام / ورود</Link></li>
                                }
                            </ul>
                        </div>
                    </div>

                </nav>
            </header>
            {
                isAdmin
                    ? <div className="my-5"></div>
                    :
                    <>
                        <section className="mb-5">
                            <div className="container col-sm-12 col-md-6 ">
                                {
                                    isLogged
                                        ?
                                        <div className="container mt-3">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <select className="form-select form-control-sm"
                                                        aria-label="form-select-sm example"
                                                        value={sort}
                                                        onChange={e => setSort(e.target.value)}
                                                    >
                                                        <option value="">جدید</option>
                                                        <option value="sort=oldest">قدیمی</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    <Filter />
                                                </div>
                                            </div>

                                        </div>
                                        : null
                                }
                            </div>
                        </section>
                    </>
            }
        </>
    )
}

export default Header
