import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GlobalState } from './../../../GlobalState';
import axios from 'axios';

const CreateComment = () => {

    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [callback, setCallback] = state.PostsAPI.callback;
    const [token] = state.token;
    const [user] = useState(state.userAPI.name[0])
    const [text, setText] = useState("")
    const [score, setScore] = useState("")
    const params = useParams();
    const id = params.id;

    const addComment = async (e) => {
        e.preventDefault();
        const body = { user, text, score }
        await axios.post(`/api/comment/${id}`, body, {
            headers: { Authorization: token }
        })
        setCallback(!callback)
    }

    return (
        <div>

            {
                isLogged
                    ?
                    <form onSubmit={addComment} className="createComment col-sm-12  my-1 p-2  px-sm-0 p-sm-0  rounded-3">
                        <div >
                            <div >
                                <input
                                    type="text"
                                    placeholder="نام کاربری"
                                    name="user"
                                    value={user}
                                    readOnly
                                />

                            </div>
                        </div>
                        <br />
                        <textarea
                            id="" cols="30" rows="5"
                            placeholder="متن نظر"
                            name="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <br />
                        <input
                            type="Number" min="1" max="5"
                            name="score"
                            value={score}
                            onChange={e => setScore(e.target.value)}
                            required
                        />
                        <br />
                        <span>لطفا بین 1 و 5 امتیاز بده</span>
                        <br />
                        <button type="submit" className="m-4 btn btn-sm btn-outline-dark">ارسال</button>
                    </form>

                    :
                    <div className="text-center">
                        <p style={{ fontSize: "10px" }}>برای ارسال نظر لطفا اول وارد سایت شوید</p>
                    </div>
            }



        </div>
    )
}

export default CreateComment
