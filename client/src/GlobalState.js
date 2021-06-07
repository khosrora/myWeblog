import { createContext, useEffect, useState } from "react"
import axios from 'axios';

// API
import PostsAPI from './api/PostsApi';
import CategoriesAPI from './api/CategoriesApi';
import UserAPI from './api/UserApi';
import SuggestAPI from './api/SuggestApi';
import GetUsersAPI from './api/GetUsersAPI';
import GlobalData from './api/GlobalData';


export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token")
        setToken(res.data.accesstoken)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if (firstLogin) refreshToken();
    }, [])



    const state = {
        GlobalData: GlobalData(),
        token: [token, setToken],
        PostsAPI: PostsAPI(),
        CategoriesAPI: CategoriesAPI(),
        userAPI: UserAPI(token),
        SuggestAPI: SuggestAPI(),
        GetUsersAPI: GetUsersAPI(),
    }


    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

