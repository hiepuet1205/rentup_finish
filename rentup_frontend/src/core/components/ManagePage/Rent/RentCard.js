import classes from "./RentCard.module.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { deleteRoom, postRoom } from '../../../../api/RoomApi';
import AuthContext from '../../../../store/auth-context';

const RoomCard = props => {
    return (
        <div className={`${classes.shadow} ${classes.roomCard}`} key={props.item.index}>
            <div className={classes.img}>
                <img src={props.item.cover} alt='' />
            </div>
            <div className={classes.text}>
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
                <p>
                    <i class="fa fa-hourglass-start"></i> Expried at: {props.item.expriedAt}
                </p>
            </div>
        </div>
    )
}

export default RoomCard