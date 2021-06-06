import { useContext } from 'react'
import { GlobalState } from './../../../GlobalState';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Favourite = () => {


    const state = useContext(GlobalState);
    const [token] = state.token;
    const [callback, setCallback] = state.userAPI.callback;
    const [fav] = state.userAPI.fav

    const removeFav = async id => {
        try {
            const res = await axios.put(`user/removefav/${id}`, null, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
            console.log(res);
        } catch (err) {
            alert(err.message)
        }
    }


    if (fav.length === 0)
        return <h2 className="text-muted text-center">شما هیچ مطلبی را ذخیره نکرده اید</h2>

    return (
        <section className="container">
            <div className="row">
                {
                    fav.map(post => (
                        <div className="card-group col-sm-12 col-md-6 col-lg-3" key={post._id}>
                            <div className="card ">
                                <LazyLoadImage effect="blur" className="card-img-top img-fluid" src={post.images} alt={post.name} style={{ height: "300px" }} />
                                <div className="card-body text-end">
                                    <h5 className="card-title">{post.name}</h5>
                                    <p class="card-text" style={{ fontSize: "10px" }}>
                                        {post.subject.length < 50
                                            ? `${post.subject}`
                                            : `${post.subject.substring(0, 50)}...`}
                                    </p>
                                    <Link className="mx-2 btn btn-sm btn-outline-dark" to={`/detailPost/${post._id}`}>بیشتر بخوانید</Link>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => removeFav(post._id)}>
                                        نمیپسندم
                                        </button>
                                </div>
                                <div className="card-footer text-center">
                                    <small className="text-muted">شما این مطلب را ذخیره کرده اید</small>
                                </div>
                            </div>
                        </div >
                    ))}
            </div>
        </section>
    )
}

export default Favourite
