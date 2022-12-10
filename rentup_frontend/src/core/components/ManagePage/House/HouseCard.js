import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteHouse } from '../../../../api/HouseApi';
import AuthContext from '../../../../store/auth-context';
import classes from "./HouseCard.module.css";
import Popup from "../../common/Popup/Popup"

const HouseCard = props => {
    const authCtx = useContext(AuthContext)
    
    const [popup, setPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('Successfully')
    const [popupDetail, setPopupDetail] = useState('Your house has been deleted!')
    
    const deleteHandler = () => {
        deleteHouse(props.item.id, authCtx.token)
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
                setPopupTitle('Delete House successfully')
                setPopupDetail('Your house has been deleted!')
            }
            setPopup(true)
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
        <div className={`${classes.shadow} ${classes.houseCard}`} key={props.item.index}>
            <div className={classes.img}>
                <img src={props.item.cover} alt='' />
            </div>
            <div className={classes.text}>
                <h4>{props.item.category}</h4>
                <p>
                    <i className='fa fa-location-dot'></i> {props.item.location}
                </p>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link to={`/manage/house/${props.item.id}/view`} className={classes.viewhouse}>view</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link to={`/manage/house/${props.item.id}/edit`} className={classes.edithouse}>Edit</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link to={`/manage/house/${props.item.id}/add-room`} className={classes.addroom}>Add Room</Link>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <Link className={classes.deletehouse} onClick={deleteHandler}>Delete</Link>
            </div>
            <Popup trigger={popup}>
                <h3>{popupTitle}</h3>
                <p>{popupDetail}</p>
                <button type="button" onClick={reloadPage}>Ok</button>
            </Popup>
        </div>
    )
}

export default HouseCard