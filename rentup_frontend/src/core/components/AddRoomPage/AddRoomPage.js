import img from "../../../assets/img/backgroundSignin.jpg"
import classes from "./AddRoomPage.module.css"
import { Link, useParams, useHistory } from "react-router-dom";
import { useContext, useState, useRef } from "react"
import AuthContext from '../../../store/auth-context';
import {createRoom} from '../../../api/RoomApi'
import Popup from "../common/Popup/Popup"

const typeData = [
    {
        text: "Family House",
        value: "1"
    },
    {
        text: "House & Villa",
        value: "2"
    },
    {
        text: "Apartment",
        value: "3"
    },
    {
        text: "Office & Studio",
        value: "4"
    },
    {
        text: "Villa & Condo",
        value: "5"
    },
    
]

const AddRoomPage = () => {
    const params = useParams()

    const id = params.id
    
    const history = useHistory()
    
    const authCtx = useContext(AuthContext)
    
    const imageRef = useRef()
    const [popup, setPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('Add Room successfully')
    const [popupDetail, setPopupDetail] = useState('Your Room has been added!')
    const [popupRedirect, setPopupRedirect] = useState(false)
    
    const [values, setValues] = useState({
        house: id,
        name: '',
        category: '1',
        area: 0,
        rentPrice: 0,
        waterPrice: 0,
        electricityPrice: 0,
        servicePrice: 0,
        detail: '',
    })
    
    const{house, name, category, area, 
        rentPrice, waterPrice, electricityPrice, servicePrice, detail} = values
        
    const handleChange = (key) => {
        return (event) => {
            setValues({...values, [key]: event.target.value})
        }
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const room = {
            house: house,
            name: name,
            category: category,
            area: area,
            rentPrice: rentPrice,
            waterPrice: waterPrice,
            electricityPrice: electricityPrice,
            servicePrice: servicePrice,
            detail: detail,
            image: imageRef.current.files[0],
        }
        
        // optional: Add validation
        
        createRoom(room, authCtx.token)
        .then((response) => {
            console.log(response)
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                if(response.data.non_field_errors){
                    setPopupDetail(response.data.non_field_errors)
                }
                if(response.data.house){
                    setPopupDetail(response.data.house)
                }
                setPopupRedirect(false)
            }
            if(response.status === 403){
                setPopupTitle('Failed')
                setPopupDetail('You do not have permission to perform this action!')
                setPopupRedirect(false)
            }
            if(response.status === 201){
                setPopupTitle('Add Room successfully')
                setPopupDetail('Your Room has been added!')
                setPopupRedirect(true)
            }
            setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const redirectToManageHousePage = () => {
        if(popupRedirect){
            history.replace(`/manage/house/${id}/view`)    
        }else{
            setPopup(false)
        }
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Add Room</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <select 
                            value={category}
                            onChange={handleChange('category')}
                        >
                            {typeData.map(type => <option value={type.value}>{type.text}</option>)}
                        </select>
                        <span></span>
                        <label>Type</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={name}
                            onChange={handleChange('name')}/>
                        <span></span>
                        <label>Name</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="number" required value={area}
                            onChange={handleChange('area')}/>
                        <span></span>
                        <label>Area</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="number" required value={rentPrice}
                            onChange={handleChange('rentPrice')}/>
                        <span></span>
                        <label>Rent Price</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="number" required value={waterPrice}
                            onChange={handleChange('waterPrice')}/>
                        <span></span>
                        <label>Water Price</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="number" required value={electricityPrice}
                            onChange={handleChange('electricityPrice')}/>
                        <span></span>
                        <label>Electricity Price</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="number" required value={servicePrice}
                            onChange={handleChange('servicePrice')}/>
                        <span></span>
                        <label>Service Price</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={detail}
                            onChange={handleChange('detail')}/>
                        <span></span>
                        <label>Detail</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="file" required ref={imageRef}/>
                        <span></span>
                        <label>Image</label>
                    </div>
                    <button type="submit">Add</button>
                    <div className={classes.signup_link}>
                        <Link to="/">home</Link>
                    </div>
                </form>
            </div>
            <img src={img} alt='' />
            <Popup trigger={popup}>
                <h3>{popupTitle}</h3>
                <p>{popupDetail}</p>
                <button type="button" onClick={redirectToManageHousePage}>Ok</button>
            </Popup>
        </section>
    )
}

export default AddRoomPage 