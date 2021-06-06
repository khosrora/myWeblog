import { useContext } from 'react'
import LoadPost from '../../../utils/LoadPost';
import { GlobalState } from './../../../GlobalState';
import PostItem from './PostItem'





const Post = () => {

    const state = useContext(GlobalState);
    const [post] = state.PostsAPI.posts;


    return (
        <section className="container">
            <div className="row">
                {
                    post.map(post =>
                        <PostItem
                            key={post._id}
                            post={post}
                        />
                    )
                }
            </div>
            <LoadPost />
        </section >
    )
}

export default Post
