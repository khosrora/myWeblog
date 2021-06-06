import React from 'react'
import SuggestBook from './SuggestBook';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Welcome = () => {
    return (
        <div>
            <section className="mt-5" dir="ltr">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-sm-12 col-md-6">
                            <LazyLoadImage effect="blur" className="img-fluid" src="images/5396346.jpg" alt="" />
                        </div>
                        <SuggestBook />
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Welcome
