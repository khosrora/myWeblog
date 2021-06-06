import { useContext } from 'react'
import { GlobalState } from './../../../GlobalState';




const SuggestBook = () => {


    const state = useContext(GlobalState);


    const [sugg] = state.SuggestAPI.suggest;


    return (

        <div className="col-sm-12 col-md-6">
            <h4>اینجا جایی برای نوشتن من است</h4>
            <p>
                اگر فکر میکنی دوست داری که بخشی از روزمرگی های من باشی میتونی ثبت نام کنی و وارد این وبلاگ بشی
        </p>
            <p>
                !!
                همیشه میتونی نظرات خودت رو برای من بنویسی تا شاید گه گاهی قرار بشه با هم بحث کنیم

        </p>
            <div className="alert alert-primary  mt-5" role="alert">
                <h4 className="mt-3">معرفی کتاب امروز</h4>
                <hr />
                <p>
                    {sugg.title}
                </p>
                <p className="font-smaller" style={{ fontSize: "10px" }}>
                    <em>
                        {sugg.description}
                    </em>
                </p>
            </div>
        </div>
    )
}

export default SuggestBook
