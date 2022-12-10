import { useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { resetPassword } from "../../../api/AuthApi";
import img from "../../../assets/img/backgroundSignin.jpg";
import Popup from "../common/Popup/Popup";
import classes from "./ResetPasswordPage.module.css";


const ResetPasswordPage = () => {
    const newPasswordInputRef = useRef("")
    const newPasswordRepeatInputRef = useRef("")
    
    const [popup, setPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('Reset password successfully')
    const [popupDetail, setPopupDetail] = useState('Your password has been updated')
    const [popupRedirect, setPopupRedirect] = useState(false)
    
    const history = useHistory()
    
    const params = useParams()
    
    const token = params.token
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredNewPasswordRepeat = newPasswordRepeatInputRef.current.value;
        
        if(enteredNewPassword !== enteredNewPasswordRepeat){
            setPopupTitle('Failed')
            setPopupDetail('Repeated password is not the same')
            setPopupRedirect(false)
            setPopup(true)
            return;
        }
        
        resetPassword(token, {new_password: enteredNewPassword})
        .then((response) => {
            console.log(response)
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail(response.data)
                setPopupRedirect(false)
            }
            if(response.status === 200){
                setPopupTitle('Reset password successfully')
                setPopupDetail('Your password has been updated')
                setPopupRedirect(true)
            }
            setPopup(true)
        })
        .catch((error) => console.error(error))
    }
    
    const redirectSigninPage = () => {
        if(popupRedirect){
            history.replace("/signin")    
        }else{
            setPopup(false)
        }
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Reset Password</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={newPasswordInputRef}/>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={newPasswordRepeatInputRef}/>
                        <span></span>
                        <label>Password Repeat</label>
                    </div>
                    <button type="submit">Submit</button>
                    <div className={classes.signup_link}>
                        <Link to="/">home</Link>
                    </div>
                </form>
                <Popup trigger={popup}>
                    <h3>{popupTitle}</h3>
                    <p>{popupDetail}</p>
                    <button type="button" onClick={redirectSigninPage}>Ok</button>
                </Popup>
            </div>
            <img src={img} alt='' />
        </section>
    )
}

export default ResetPasswordPage