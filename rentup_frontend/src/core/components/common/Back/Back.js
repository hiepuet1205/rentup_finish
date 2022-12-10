import classes from "./Back.module.css"
import { Link } from "react-router-dom"

const Back = ({ name, title, cover, path, action }) => {
    return (
        <div className={classes.back}>
            <div className={classes.container}>
                <span>{name}</span>
                <h1>{title}</h1>
                {path && action && <Link to={path} className={classes.btn2}>{action}</Link>}
            </div>
            <img src={cover} alt='' />
        </div>
    )
}

export default Back;