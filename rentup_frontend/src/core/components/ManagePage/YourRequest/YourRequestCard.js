import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { cancel_rent_request } from '../../../../api/RentRequestApi';
import AuthContext from '../../../../store/auth-context';
import Popup from "../../common/Popup/Popup";
import LandlordCard from "../../HomePage/landlord/LandlordCard";
import RecentCard from "../../HomePage/Recent/RecentCard";
import classes from "./YourRequestCard.module.css";

const YourRequestCard = props => {
    const authCtx = useContext(AuthContext)
    
    const history = useHistory()
    
    const [popup, setPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('Cancel request successfully')
    const [popupDetail, setPopupDetail] = useState('Your request has been cancelled!')
    
    const cancelRentRequest = () => {
        cancel_rent_request(props.item.id, authCtx.token)
        .then((response) => {
            if(response.status === 400){
                setPopupTitle(response.statusText)
                setPopupDetail(response.data)
            }
            if(response.status === 403){
                setPopupTitle('Failed')
                setPopupDetail('You do not have permission to perform this action!')
            }
            if(response.status === 200){
                setPopupTitle('Cancel request successfully')
                setPopupDetail('Your request has been cancelled!')
            }
           setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const reloadPage = () => {
        setPopup(false)
        props.reload()
    }
    
    return (
        <div className={`${classes.shadow} ${classes.rentRequestCard}`} key={props.item.index}>
            <div className={classes.rentRequestCard_info}>
                <RecentCard item={props.item.room}/>
                <LandlordCard item={props.item.landlord}/>
            </div>
            <div className={classes.rentRequestCard_message}>
                <h2>Message:</h2>
                <p>{props.item.message}</p>
            </div>
            <div className={`${classes.rentRequestCard_action}`}>
                <button onClick={cancelRentRequest}>Cancel</button>
            </div>
            <Popup trigger={popup}>
                <h3>{popupTitle}</h3>
                <p>{popupDetail}</p>
                <button type="button" onClick={reloadPage}>Ok</button>
            </Popup>
        </div>
    )
}
export default YourRequestCard