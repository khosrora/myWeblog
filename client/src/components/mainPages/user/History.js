import React from 'react'
import { useContext } from 'react';
import { GlobalState } from './../../../GlobalState';

const History = () => {

    const state = useContext(GlobalState);
    const infor = state.userAPI.infor[0];

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">نام کاربری</th>
                        <th scope="col">پست الکترونیک</th>
                        <th scope="col">شماره همراه</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img className="img-fluid" src={infor.avatar} alt={infor.avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></td>
                        <th scope="row">{infor.fullname}</th>
                        <td>{infor.email}</td>
                        <td>{infor.mobile}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default History
