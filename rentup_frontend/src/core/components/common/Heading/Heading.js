import classes from './Heading.module.css'

const Heading = ({ title, subtitle }) => {
    return (
        <div className={classes.heading}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    )
  }
  
  export default Heading;