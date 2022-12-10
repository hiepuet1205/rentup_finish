import img from "../../../assets/img/backgroundSignin.jpg"
import classes from "./EditHousePage.module.css"
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react"
import AuthContext from '../../../store/auth-context';
import {getProvince, getDistrict, getWard} from "../../../api/ProvinceApi"
import { getHouseDetail, editHouse } from "../../../api/HouseApi";
import { useParams } from 'react-router-dom';
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

const EditHousePage = () => {
    const history = useHistory()
    
    const params = useParams()

    const id = params.id
    
    const [cityData, setCityData] = useState([])
    const [districtData, setDistrictData] = useState([])
    const [wardData, setWardData] = useState([])
    
    const imageRef = useRef()
    
    const [values, setValues] = useState({
        city: '1',
        district: '1',
        ward: '1',
        type: '1',
        detail: '',
        description: ''
    })
    const [popup, setPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('Edit House successfully')
    const [popupDetail, setPopupDetail] = useState('Your house has been updated!')
    const [popupRedirect, setPopupRedirect] = useState(false)
    
    const {city, district, ward, type, detail, description} = values
    
    const authCtx = useContext(AuthContext)
    
    useEffect(() => {
        getProvince().then(data => {
            const tempCity = []
            data.forEach(data => {
                tempCity.push({
                    text: data.name,
                    value: data.code,
                })
            })
            setCityData(tempCity)
        })
        .catch(error => console.log('Error', error))
    }, [])
    
    useEffect(() => {
        getDistrict(city).then(data => {
            const tempDistrict = []
            data.districts.forEach(data => {
                tempDistrict.push({
                    text: data.name,
                    value: data.code,
                })
            })
            setDistrictData(tempDistrict)
        })
        .catch(error => console.log('Error', error))
    }, [city])
    
    useEffect(() => {
        getWard(district).then(data => {
            const tempWard = []
            data.wards.forEach(data => {
                tempWard.push({
                    text: data.name,
                    value: data.code,
                })
            })
            setWardData(tempWard)
        })
        .catch(error => console.log('Error', error))
    }, [district])
    
    useEffect(() => {
        getHouseDetail(id, authCtx.token)
        .then((data) => {
            setValues({
                city: '1',
                district: '1',
                ward: '1',
                type: '1',
                detail: data.detail,
                description: data.description,
            })
        })
        .catch((err) => {
            alert(err.message);
        });
        
    }, [id])
    
    const handleChange = (key) => {
        return (event) => {
            setValues({...values, [key]: event.target.value})
        }
    }
    
    const submitHandler = (event) => {
        event.preventDefault();

        const cityInput = cityData.find(c => c.value == city).text
        const districtInput = districtData.find(d => d.value == district).text
        const wardInput = wardData.find(w => w.value == ward).text
        
        const house = {
            category: type,
            city: cityInput,
            district: districtInput,
            ward: wardInput,
            detail: detail,
            description: description,
            image: imageRef.current.files[0],
        }
        
        editHouse(id, house, authCtx.token)
        .then((response) => {
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail(response.data)
                setPopupRedirect(false)
            }
            if(response.status === 403){
                setPopupTitle('Failed')
                setPopupDetail('You do not have permission to perform this action!')
                setPopupRedirect(false)
            }
            if(response.status === 200){
                setPopupTitle('Edit House successfully')
                setPopupDetail('Your house has been updated!')
                setPopupRedirect(true)
            }
            setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const goBackPage = () => {
        if(popupRedirect){
            history.goBack()
        }else{
            setPopup(false)
        }
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Edit House</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <select 
                            value={type}
                            onChange={handleChange('type')}
                        >
                            {typeData.map(type => <option value={type.value}>{type.text}</option>)}
                        </select>
                        <span></span>
                        <label>Type</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={city}
                            onChange={handleChange('city')}
                        >
                            {cityData.map(city => <option value={city.value}>{city.text}</option>)}
                        </select>
                        <span></span>
                        <label>City</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={district}
                            onChange={handleChange('district')}
                        >
                            {districtData.map(district => <option value={district.value}>{district.text}</option>)}
                        </select>
                        <span></span>
                        <label>District</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={ward}
                            onChange={handleChange('ward')}
                        >
                            {wardData.map(ward => <option value={ward.value}>{ward.text}</option>)}
                        </select>
                        <span></span>
                        <label>Ward</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={detail} onChange={handleChange('detail')}/>
                        <span></span>
                        <label>Detail</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={description} onChange={handleChange('description')}/>
                        <span></span>
                        <label>Description</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="file" required ref={imageRef}/>
                        <span></span>
                        <label>Image</label>
                    </div>
                    <button type="submit">Submit</button>
                    <div className={classes.signup_link}>
                        <Link to="/">home</Link>
                    </div>
                </form>
            </div>
            <img src={img} alt='' />
            <Popup trigger={popup}>
                <h3>{popupTitle}</h3>
                <p>{popupDetail}</p>
                <button type="button" onClick={goBackPage}>Ok</button>
            </Popup>
        </section>
    )
}

export default EditHousePage 