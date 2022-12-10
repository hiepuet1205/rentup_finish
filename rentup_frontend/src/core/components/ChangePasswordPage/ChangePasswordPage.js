import { useRef, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { changePassword } from "../../../api/UserApi";
import img from "../../../assets/img/backgroundSignin.jpg";
import Popup from "../common/Popup/Popup";
import classes from "./ChangePasswordPage.module.css";
import AuthContext from '../../../store/auth-context';


const ChangePasswordPage = () => {
    const oldPasswordInputRef = useRef("")
    const newPasswordInputRef = useRef("")
    const passwordRepeatInputRef = useRef("")
    
    const [popupTitle, setPopupTitle] = useState('Change password successfully')
    const [popupDetail, setPopupDetail] = useState('Your password has been updated')
    const [popupRedirect, setPopupRedirect] = useState(false)
    
    const authCtx = useContext(AuthContext)
    
    const [popup, setPopup] = useState(false)
    
    const history = useHistory()
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredOldPassword = oldPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredPasswordRepeat = passwordRepeatInputRef.current.value;
        
        if(enteredNewPassword !== enteredPasswordRepeat){
            setPopupTitle('Failed')
            setPopupDetail('Repeated password is not the same')
            setPopupRedirect(false)
            setPopup(true)
            return;
        }
        
        const data = {
            old_password: enteredOldPassword, 
            new_password: enteredNewPassword
        }
        
        changePassword(authCtx.token, data)
        .then((response) => {
            // console.log(response)
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail(response.data)
                setPopupRedirect(false)
                setPopup(true)
            }
            if(response.status === 200){
                setPopupTitle('Change password successfully')
                setPopupDetail('Your password has been updated')
                setPopupRedirect(true)
                authCtx.logout()
                history.replace("/signin")
                setPopup(true)
            }
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
                <h1>Change Password</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={oldPasswordInputRef}/>
                        <span></span>
                        <label>Old Password</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={newPasswordInputRef}/>
                        <span></span>
                        <label>New Password</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={passwordRepeatInputRef}/>
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

export default ChangePasswordPage