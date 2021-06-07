import { useContext } from 'react'
import { GlobalState } from './../../../GlobalState';
import axios from 'axios';

const GetUsers = () => {

    const state = useContext(GlobalState);
    const [users] = state.GetUsersAPI.users;
    const [callback, setCallBack] = state.GetUsersAPI.callback;

    const setAdmin = async id => {
        try {
            await axios.get(`/user/setadmin/${id}`);
            setCallBack(!callback)
        } catch (err) {
            alert(err.message)
        }
    }

    const deleteUser = async id => {
        try {
            await axios.delete(`/user/deleteUser/${id}`);
            setCallBack(!callback)
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <div className="container">
                <p> 
                <span className="text-danger">{users.result}</span>
                کاربران ثبت نام کرده
                </p>
            </div>
            <table className="table" style={{ overflow: "auto" }}>
                <thead>
                    <tr>
                        <th scope="col">شماره</th>
                        <th scope="col">نام کاربری</th>
                        <th scope="col">پست الکترونیک</th>
                        <th scope="col">شماره همراه</th>
                        <th scope="col">عملیات ها</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.allUser.map((item, index) =>
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>
                                    <button className="mx-1 btn btn-sm btn-warning text-white" onClick={() => setAdmin(item._id)}>
                                      {item.admin === 0 ? "  اعمال مدیریت" : "مدیر است"}
                                    </button>
                                    <button className="mx-1 btn btn-sm btn-danger text-white" onClick={() => deleteUser(item._id)}>حذف</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GetUsers
