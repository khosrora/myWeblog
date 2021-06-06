import { Link } from "react-router-dom"



const NotFound = () => {
    return (
        <section className="page_404">
            <div className="container-fluid">
                <div className="row">
                    <div className=" col-sm-12">
                        <div className="col-sm-12 col-sm-offset-1 text-center">
                            <div className="four_zero_four_bg">
                               
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">
                                    آدرس اشتباهی وارد کردی
		                        </h3>
                                <p>به نظر میاد که این صفحه وجود ندارد</p>

                                <Link className="btn btn-success" to="/">بازگشت به صفحه اصلی</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
