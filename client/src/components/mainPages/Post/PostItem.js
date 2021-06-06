import { useContext } from "react"
import { GlobalState } from './../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'jalali-moment';


const PostItem = ({ post }) => {


    const state = useContext(GlobalState);
    const [token] = state.token;
    const [isAdmin] = state.userAPI.isAdmin;
    const [callback, setCallback] = state.PostsAPI.callback;
    const addFav = state.userAPI.addFav;

    const removePost = async id => {
        try {
            const res = await axios.delete(`/api/post/${id}`, {
                headers: { Authorization: token }
            })
            alert(res.data.msg);
            setCallback(!callback)
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="card-group col-sm-12 col-md-6 col-lg-3 mt-2">
            <div className="card" style={{ boxShadow: "0px 0px 5px #9E9E9E" }}>
                <LazyLoadImage
                    effect="blur"
                    className="card-img-top img-fluid"
                    src={post.images} alt={post.name}
                    style={{ height: "300px", borderRadius: 3 }}

                />

                <div className="card-body text-end">
                    <h5 className="card-title">{post.name}</h5>
                    <p className="card-text" style={{ fontSize: "10px" }}>
                        {post.subject.length < 50
                            ? `${post.subject}`
                            : `${post.subject.substring(0, 50)}...`}
                    </p>
                    {
                        isAdmin
                            ?
                            <>
                                <Link className="mx-2 btn btn-sm btn-outline-secondary" to={`/detailPost/${post._id}`}>بیشتر بخوانید</Link>
                                <Link className="mx-2 btn btn-sm btn-outline-secondary " to={`/editpost/${post._id}`}>ویرایش</Link>
                                <button
                                    type="button"
                                    className="mx-2 mt-2 btn btn-sm btn-outline-danger"
                                    onClick={() => removePost(post._id)}
                                >حذف پست</button>
                            </>
                            :
                            <>
                                <Link className="mx-2 btn btn-sm btn-outline-dark" to={`detailPost/${post._id}`}>بیشتر بخوانید</Link>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => addFav(post)}
                                >میپسندم </button>
                            </>
                    }
                </div>
                <div className="card-footer text-center">
                    <small className="text-muted">{moment(post.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</small>
                </div>
            </div>
        </div >
    )
}

export default PostItem
