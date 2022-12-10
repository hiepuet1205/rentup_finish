import classes from "./RecentCard.module.css"
import { Link } from 'react-router-dom'

const typeData = [
    {
        text: "Family House",
        value: "Family House"
    },
    {
        text: "House & Villa",
        value: "House & Villa"
    },
    {
        text: "Apartment",
        value: "Apartment"
    },
    {
        text: "Office & Studio",
        value: "Office & Studio"
    },
    {
        text: "Villa & Condo",
        value: "Villa & Condo"
    },
    
]

const RecentCard = props => {
    return (
        <Link className={`${classes.shadow} ${classes.recentCard}`} key={props.item.index} to={`/post/${props.item.room_id}`}>
            <div className={classes.img}>
                <img src={props.item.cover} alt='' />
            </div>
            <div className={classes.text}>
                <div className={`${classes.category} ${classes.flex}`}>
                    <span style={{ background: "#ff98001a", color: "#ff9800" }}>{props.item.category}</span>
                </div>
                <h4>{props.item.room_name}</h4>
                <p>
                    <i className='fa fa-location-dot'></i> {props.item.city} - {props.item.district} - {props.item.ward}
                </p>
            </div>
            <div className={`${classes.button} ${classes.flex}`}>
                <div>
                    <button className={classes.btn2}>{props.item.totalPrice} đ</button> <label htmlFor=''>/month</label>
                </div>
                <span>{props.item.category}</span>
            </div>
        </Link>
    )
}

export default RecentCard