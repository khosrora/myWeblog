import { useContext } from 'react'
import { GlobalState } from './../GlobalState';

const LoadPost = () => {

    const state = useContext(GlobalState)
    const [page, setPage] = state.PostsAPI.page;
    const [result] = state.PostsAPI.result;

    return (
        <div className="container text-center my-3">
            {
                result < page * 8
                    ? ""
                    :
                    <button type="button"
                        className="btn btn-outline-dark"
                        onClick={() => setPage(page + 1)}
                    >مطالب بیشتر</button>
            }
        </div>
    )
}

export default LoadPost
