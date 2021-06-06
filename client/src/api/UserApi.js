import { useState, useEffect } from 'react';
import axios from 'axios';

const UserAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [infor, setInfor] = useState([])
    const [fav, setFav] = useState([])
    const [callback, setCallback] = useState(false)




    const addFav = async (post) => {
        if (!isLogged) return alert("لطفا وارد سایت شوید")

        const check = fav.every(item => {
            return item._id !== post._id
        })
        if (check) {
            setFav([...fav, { ...post, counter: 1 }]);

            await axios.patch("/user/addfav", { fav: [...fav, { ...post, counter: 1 }] }, {
                headers: { Authorization: token }
            })
        } else {
            alert("این مطلب به لیست علاقه مندی ها اضافه شد")
        }
    }

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get("/user/infor", {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    res.data.admin === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setInfor(res.data);
                    setAvatar(res.data.avatar);
                    setName(res.data.fullname);
                    setFav(res.data.fav)
                } catch (err) {
                    alert(err.msg)
                }
            }
            getUser();
        }
    }, [token, callback])



    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        infor: [infor, setInfor],
        fav: [fav, setFav],
        addFav: addFav,
        avatar: [avatar, setAvatar],
        name: [name, setName],
        callback: [callback, setCallback]
    }
}

export default UserAPI
