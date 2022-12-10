import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../../api/AuthApi";
import img from "../../../assets/img/backgroundSignin.jpg";
import Popup from "../common/Popup/Popup";
import classes from "./ForgetPasswordPage.module.css";

const ForgetPasswordPage = () => {
    const emailInputRef = useRef("")
    
    const [popup, setPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('Email has been sent')
    const [popupDetail, setPopupDetail] = useState('An email containing a link to change your password has been sent to you')
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredEmail = emailInputRef.current.value;
        
        forgetPassword({email: enteredEmail})
        .then((response) => {
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail(response.data)
            }
            if(response.status === 200) {
                setPopupTitle('Email has been sent')
                setPopupDetail('An email containing a link to change your password has been sent to you')
            }
            setPopup(true)
        })
        .catch((error) => console.error(error))
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Forget Password</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <input type="text" required ref={emailInputRef}/>
                        <span></span>
                        <label>Email</label>
                    </div>
                    <button type="submit">Submit</button>
                    <div className={classes.signup_link}>
                        <Link to="/">home</Link>
                    </div>
                </form>
            </div>
            <img src={img} alt='' />
            <Popup trigger={popup}>
                <h3>{popupTitle}</h3>
                <p>{popupDetail}</p>
                <button type="button" onClick={() => {setPopup(false);}}>Ok</button>
            </Popup>
        </section>
    )
}

export default ForgetPasswordPage