import { Switch, Route } from "react-router-dom"
import { withRouter } from "react-router"
import Post from './Post/Post';
import PostDetail from './Post/PostDetail';
import Auth from './Auth/Auth';
import Header from './../Header/Header';
import NotFound from "../notFound/NotFound";
import Favourite from './Favourite/Favourite';
import Categories from './categories/Categories';
import History from "./user/History";
import CreatePost from "./createPost/CreatePost";
import Welcome from './Welcome/Welcome';
import Suggestbook from './suggestbook/Suggestbook';
import GetUsers from './getusers/GetUsers';


import { useContext } from 'react';
import { GlobalState } from './../../GlobalState';



const Pages = ({ location }) => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (

        < div >
            {location.pathname !== '/auth' && <Header />}
            <Switch>
                {
                    !isLogged
                        ?
                        <>
                            <Route exact path="/" component={Welcome} />
                            <Route exact path="/auth" component={Auth} />
                        </>
                        :
                        <>
                            <Route exact path="/" component={Post} />
                            <Route exact path="/detailPost/:id" component={PostDetail} />

                            <Route exact path="/category" component={isAdmin ? Categories : NotFound} />
                            <Route exact path="/history" component={History} />
                            <Route exact path="/createpost" component={isAdmin ? CreatePost : NotFound} />
                            <Route exact path="/editpost/:id" component={isAdmin ? CreatePost : NotFound} />
                            <Route exact path="/getusers" component={isAdmin ? GetUsers : NotFound} />
                            <Route exact path="/suggestbook/60b3a1697cab342c9c239b08" component={isAdmin ? Suggestbook : NotFound} />
                            <Route exact path="/addfav" component={Favourite} />
                        </>
                }
                <Route path="*" component={NotFound} />
            </ Switch>
        </div >
    )
}

export default withRouter(Pages);
