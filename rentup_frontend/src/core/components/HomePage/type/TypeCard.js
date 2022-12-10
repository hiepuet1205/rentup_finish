import classes from "./TypeCard.module.css"

const TypeCard = props => {
    const handleClick = () => {
        props.handleFilter({
            category: props.item.text
        })
    }
    
    return (
        <div className={classes.box} key={props.index} onClick={handleClick}>
            <img src={props.item.img} alt='' />
            <h4>{props.item.text}</h4>
        </div>
    )
}

export default TypeCard