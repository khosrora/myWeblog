import { useContext, useState } from 'react'
import { GlobalState } from './../../../GlobalState';
import axios from 'axios';

const Suggestbook = () => {


    const state = useContext(GlobalState);
    const [token] = state.token;
    const [sugg] = state.SuggestAPI.suggest;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [callback, setCallback] = state.SuggestAPI.callback;

    
    const newSugg = async (e) => {
        e.preventDefault();
        const id = sugg._id
        await axios.put(`/api/suggestbook/${id}`, {
            title, description
        }, {
            headers: { Authorization: token }
        })
        setCallback(!callback)
    }


    return (
        <div className="container col-sm-12 col-lg-6">
            <form onSubmit={newSugg}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">نام پست</label>
                    <input type="text" name="title" className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"></label>
                    <textarea rows='3' type="text" name="description" className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-dark">ارسال</button>
            </form>
            <div className="container-fluid text-center mt-3">
                <h3>کتاب معرفی شده قبلی</h3>
                <div className="row">
                    <div className="col-sm-12 my-2">
                        <p>
                            {sugg.title}
                        </p>
                    </div>
                    <div className="col-sm-12 my-2">
                        <p>
                            {sugg.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Suggestbook
