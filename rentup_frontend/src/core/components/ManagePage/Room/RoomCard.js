import classes from "./RoomCard.module.css"
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteRoom, postRoom, unPostRoom } from '../../../../api/RoomApi';
import AuthContext from '../../../../store/auth-context';
import Popup from "../../common/Popup/Popup"

const RoomCard = props => {
    const authCtx = useContext(AuthContext)
    
    const history = useHistory()
    
    const [popup, setPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('Successfully')
    const [popupDetail, setPopupDetail] = useState('Your room has been updated!')
    
    const deleteHandler = () => {
        deleteRoom(props.item.id, authCtx.token)
        .then((response) => {
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail('Some things went wrong!')
            }
            if(response.status === 403){
                setPopupTitle('Failed')
                setPopupDetail('You do not have permission to perform this action!')
            }
            if(response.status === 200){
                setPopupTitle('Edit House successfully')
                setPopupDetail('Your house has been updated!')
            }
            setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const postHandler = () => {
        postRoom(props.item.id, authCtx.token)
        .then((response) => {
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail('Some things went wrong!')
            }
            if(response.status === 403){
                setPopupTitle('Failed')
                setPopupDetail('You do not have permission to perform this action!')
            }
            if(response.status === 200){
                setPopupTitle('Edit House successfully')
                setPopupDetail('Your house has been updated!')
            }
            setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const unPostHandler = () => {
        unPostRoom(props.item.id, authCtx.token)
        .then((response) => {
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail('Some things went wrong!')
            }
            if(response.status === 403){
                setPopupTitle('Failed')
                setPopupDetail('You do not have permission to perform this action!')
            }
            if(response.status === 200){
                setPopupTitle('Edit House successfully')
                setPopupDetail('Your house has been updated!')
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
        <div className={`${classes.shadow} ${classes.roomCard}`} key={props.item.index}>
            <div className={classes.img}>
                <img src={props.item.cover} alt='' />
            </div>
            <div className={classes.text}>
                <div className={`${classes.category} ${classes.flex}`}>
                    <span style={{ background: "#ff98001a", color: "#ff9800" }}>{props.item.active ? "active" : "inactive"}</span>
                </div>
                <h4>{props.item.category}</h4>
                <p>
                    <i class="fa fa-info"></i> Info: {props.item.detail}
                </p>
                <p>
                    <i class="fa fa-chart-area"></i> Area: {props.item.area} m^2
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Rent price: {props.item.rent_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Water price: {props.item.water_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Electricity price: {props.item.electricity_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Services price: {props.item.service_price}đ / month
                </p>
                <p>
                    <i class="fa fa-money-check"></i> Total price: {props.item.totalPrice}đ / month
                </p>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                {!props.item.active && <button className={classes.postRoom} onClick={postHandler}>Post</button>}
                {props.item.active && <button className={classes.postRoom} onClick={unPostHandler}>UnPost</button>}
                
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link className={classes.editRoom} to={`/room/${props.item.id}/edit`}>Edit</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <button className={classes.btn3} onClick={deleteHandler}>Delete</button>
            </div>
            <Popup trigger={popup}>
                <h3>{popupTitle}</h3>
                <p>{popupDetail}</p>
                <button type="button" onClick={reloadPage}>Ok</button>
            </Popup>
        </div>
    )
}

export default RoomCard