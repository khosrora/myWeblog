import { useEffect, useState } from 'react';
import axios from 'axios';



const GetUsersAPI = () => {

    const [users, setUsers] = useState({})
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const GetAllUser = async () => {
            const res = await axios.get("/user/alluser")
            setUsers(res.data)
        }
        GetAllUser();
    }, [callback])


    return {
        users: [users, setUsers],
        callback: [callback, setCallback]
    }
}

export default GetUsersAPI
