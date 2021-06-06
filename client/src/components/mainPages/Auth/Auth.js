import { useState } from 'react'
import Login from './Login';
import Register from './Register';
import Base from './Base';
import { Link } from 'react-router-dom';

const Auth = () => {

    const [login, setLogin] = useState(true)

    return (
        <div>
            <div>
                <div className="auth">
                    <div className="sec_one_auth">
                        <Base />
                    </div>
                    <div className="back">
                        <Link to="/">
                        بازگشت به خانه
                        </Link>
                    </div>
                    <div className="sec_two_auth">
                        {
                            login
                                ? <Login setLogin={setLogin} />
                                : <Register setLogin={setLogin} />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Auth
