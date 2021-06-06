import { useContext, useState, useEffect } from 'react'
import { GlobalState } from './../../../GlobalState';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const initPost = {
    name: "",
    desc: "",
    subject: "",
    category: "",
}

const CreatePost = () => {

    const state = useContext(GlobalState)
    const [token] = state.token;
    const [categories] = state.CategoriesAPI.categories
    const [callback, setCallback] = state.PostsAPI.callback
    const [post, setPost] = useState(initPost);
    const [file, setFile] = useState();

    const history = useHistory()
    const param = useParams()

    const [posts] = state.PostsAPI.posts;
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            posts.forEach(post => {
                if (post._id === param.id) {
                    setPost(post)
                }
            })
        } else {
            setOnEdit(false)
            setPost(initPost)
        }
    }, [param.id, posts])





    const handleChangeInput = e => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value })
    }




    const handleSubmit = async e => {
        e.preventDefault();
        try {
            let data = new FormData();
            data.append("name", post.name)
            data.append("desc", post.desc)
            data.append("subject", post.subject)
            data.append("category", post.category)
            data.append("file", file)
            if (!file) alert("لطفا عکس را بارگذاری کنید")
            if (onEdit) {
                const res = await axios.put(`/api/post/${post._id}`, data, {
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: token
                    }
                })
                setCallback(!callback)
                history.push("/")
                console.log(res);
                alert(res.data.msg);
            } else {

                const res = await axios.post("/api/post", data, {
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: token
                    }
                })
                setCallback(!callback)
                history.push("/")
                alert(res.data.msg);
            }
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="container col-sm-12 col-lg-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">نام پست</label>
                    <input type="text" name="name" className="form-control"
                        value={post.name}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">عنوان</label>
                    <input type="text" name="subject" className="form-control"
                        value={post.subject}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">متن</label>
                    <textarea type="text" name="desc" className="form-control"
                        value={post.desc}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="mb-3">
                    <input className="form-control"
                        type="file"
                        name="file"
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
                <select className="form-select mb-3" name="category"
                    value={post.category}
                    onChange={handleChangeInput}
                >
                    <option>دسته بندی</option>
                    {
                        categories.map(item => (
                            <option key={item._id}>{item.name}</option>
                        ))
                    }

                </select>
                <button type="submit" className="btn btn-dark">{onEdit ? "ویرایش" : "ساخت"}</button>
            </form>
        </div>
    )
}

export default CreatePost
