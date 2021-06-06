import React from 'react'
import { Link } from 'react-router-dom'
import SuperCons from './../../../utils/Icon/SuperCons';


const Base = () => {
    return (
        <>
            <div>
                <h1>وبلاگ من</h1>
                <p>
                    همین حالا حساب کاربری خودت را بساز و دوران جدید وبلاگ نویسی را شروع کن.
                </p>
                <SuperCons glyph={"thumbsup"} size={32} />
                <span>اگر شما هم عاشق مطالعه هستید در ویرگول می‌توانید مطالب متنوعی را در موضوعات مختلف
                بخوانید.
                </span>
                <br />
                <SuperCons glyph={"thumbsup"} size={32} />
                <span>با نوشتن مطلبتان در ویرگول آن را در معرض دید قشر وسیعی از خوانندگان قرار خواهید داد.</span>
                <br />
                <SuperCons glyph={"thumbsup"} size={32} />
                <span>ویرگول آمار دقیقی از تعداد و میزان خوانده شدن مطلبتان به شما ارائه می‌دهد.</span>
            </div>
            <div className="footer_auth">
                <p className="mx-3">
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>صفحه اصلی</Link>
                </p>
                <p className="mx-3">
                    <Link to="#!" style={{ textDecoration: "none", color: "#fff" }}>تماس با ما</Link>
                </p>
            </div>
        </>
    )
}

export default Base
