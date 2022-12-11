import classes from "./LandlordCard.module.css"

const LandlordCard = props => {
    return (
        <div className={classes.landlordCard} key={props.index}>
            <button className={classes.btn3}>user</button>
            <div className={classes.details}>
                <div className={classes.img}>
                    <img src={props.item.cover} alt='' />
                    <i className='fa-solid fa-circle-check'></i>
                </div>
                <i className='fa fa-location-dot'></i>
                <label>{props.item.address}</label>
                <h4>{props.item.name}</h4>

                <ul>
                    <a href={props.item.linkfb}><li><i className="fa-brands fa-facebook-f"></i></li></a>
                    <a href={props.item.linkli}><li><i className="fa-brands fa-linkedin"></i></li></a>
                    <a href={props.item.linktw}><li><i className="fa-brands fa-twitter"></i></li></a>
                    <a href={props.item.linkin}><li><i className="fa-brands fa-instagram"></i></li></a>
                </ul>
                <div className={`${classes.button} ${classes.flex}`}>
                    <button>
                        <i className='fa fa-envelope'></i>
                        Message
                    </button>
                    <button className={classes.btn4}>
                        <a href={`tel:${props.item.phone}`}><i className='fa fa-phone-alt'></i></a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandlordCard