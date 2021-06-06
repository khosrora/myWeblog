import { useContext } from 'react';
import { GlobalState } from './../../../GlobalState';
import ReactStars from "react-rating-stars-component";
import moment from 'jalali-moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';




const Comments = ({ detailPost }) => {

    const state = useContext(GlobalState);
    const [token] = state.token;
    const [isAdmin] = state.userAPI.isAdmin;
    const [callback, setCallback] = state.PostsAPI.callback
    const params = useParams();
    const idPost = params.id;



    const firstExample = {
        size: 20,
        edit: false
    };

    const deleteComment = async id => {
        const body = { commentId: id }
        console.log(body);
        await axios.delete(`/api/comment/${idPost}`, { data: body }, {
            headers: { Authorization: token }
        });
        setCallback(!callback)
    }


    return (

        <>
            {
                detailPost.comment.map(item =>
                    <div className="comment border my-1  px-sm-0 rounded-3" key={item._id}>
                        <div className="">
                            <div>
                                <span>{item.user}</span>

                                <span className="d-none d-sm-block">|{moment(item.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span>
                            </div>
                            <ReactStars  {...firstExample} value={item.score} />
                            {
                                isAdmin &&
                                <button className="btn btn-small btn-danger" onClick={() => deleteComment(item._id)}>حذف</button>
                            }
                        </div>
                        <br />
                        <p >
                            {item.text}
                        </p>
                    </div>
                )
            }
        </>
    )
}

export default Comments
