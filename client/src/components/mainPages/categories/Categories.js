import { useContext, useState } from 'react'
import { GlobalState } from './../../../GlobalState';
import axios from 'axios';


const Categories = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [categories] = state.CategoriesAPI.categories;
    const [callback, setCallback] = state.CategoriesAPI.callback;
    const [category, setCategory] = useState("")
    const [edit, setEdit] = useState(false)
    const [id, setID] = useState("")


    const addCategory = async (e) => {
        e.preventDefault();
        if (edit) {
            await axios.put(`/api/category/${id}`, { name: category }, {
                headers: { Authorization: token }
            });
            setCallback(!callback)
            setEdit(false)
            setID("")
        } else {
            await axios.post("/api/category", { name: category }, {
                headers: { Authorization: token }
            });
            setCallback(!callback)
        }
    }

    const editCategory = async (id, name) => {
        setID(id)
        setCategory(name)
        setEdit(true)
    }

    const deleteCategory = async id => {
        await axios.delete(`/api/category/${id}`, {
            headers: { Authorization: token }
        })
        setCallback(!callback)
    }

    return (
        <div>
            <div className="category container">
                <div className="row">
                    <form className="col-sm-12 col-lg-6 text-center" onSubmit={addCategory}>
                        <input
                            type="text"
                            name="category"
                            id=""
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                        <br />
                        <button type="submit" className="btn btn-sm btn-dark mt-3">{edit ? "ویرایش" : "ذخیره"}</button>
                    </form>
                    <div className="col-sm-12 col-lg-6">
                        {
                            categories.map(item =>
                                <div key={item._id}>
                                    <p>نام دسته بندی : {item.name}</p>
                                    <button className="btn btn-warning text-white" onClick={() => editCategory(item._id, item.name)}>ویرایش</button>
                                    <button className="btn btn-danger mx-2" onClick={() => deleteCategory(item._id)}>حذف</button>
                                    <hr />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
