import React from 'react'
import classes from "./Popup.module.css"

const Popup = props => {
    return (props.trigger) ? (
        <div className={classes.popup}>
            <div className={classes.popup_inner}>
                {/* <button className={classes.close_btn}>x</button> */}
                {props.children}
            </div>
        </div>
    )
    : ""
}

export default Popup;