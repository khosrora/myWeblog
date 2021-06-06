import { useState, useEffect } from "react";
import axios from "axios"


const PostsAPI = () => {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    const [category, setCategory] = useState("");
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get(`/api/post?limit=${page * 8}&${category}&${sort}`)
            setPosts(res.data.post);
            setResult(res.data.result)
        }
        getPosts()
    }, [callback, category, sort, page])



    return {
        posts: [posts, setPosts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        page: [page, setPage],
        result: [result, setResult]
    }

}

export default PostsAPI;