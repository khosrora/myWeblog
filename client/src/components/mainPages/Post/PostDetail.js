import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { GlobalState } from './../../../GlobalState';
import moment from 'jalali-moment';
import Comments from './Comments';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CreateComment from '../user/CreateComment';

const PostDetail = () => {

    const params = useParams();
    const state = useContext(GlobalState)
    const [post] = state.PostsAPI.posts;
    const [detailPost, setDetailPost] = useState([]);

    useEffect(() => {
        if (params.id) {
            post.forEach(post => {
                if (post._id === params.id) setDetailPost(post)
            })
        }
    }, [params.id, post])



    if (detailPost.length === 0) return null;

    return (
        <>
            <div className="news_details container-fluid">
                <div className="row ">
                    <div className="col-sm-12 col-lg-6 text-center">
                        <LazyLoadImage
                            effect="blur"
                            className="img-fluid"
                            src={`/${detailPost.images}`}
                            alt={detailPost.name}
                            style={{ borderRadius: 5, boxShadow: "10px 5px 5px #9E9E9E" }}
                        />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <h1>{detailPost.name}</h1>
                        <span>
                            {detailPost.subject}
                        </span>
                        <h6>زمان انتشار :  <span className="badge bg-secondary">{moment(detailPost.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span></h6>
                        <hr />
                        <p style={{fontSize : "13px"}}>
                            {detailPost.desc}
                        </p>
                    </div>
                </div>
            </div>
            <div className=" sec-container ">
                <div className="container col-sm-12 col-md-6 ">
                    <CreateComment />
                    {
                        detailPost.comment.length === 0
                            ? <div className="text-center">
                                <p style={{ fontSize: "10px" }}>شما اولین نفری باشید که برای این مطلب نظر ثبت میکنید</p>
                            </div>
                            : <Comments
                                detailPost={detailPost}
                            />

                    }


                </div>
            </div>
        </>
    )
}

export default PostDetail
