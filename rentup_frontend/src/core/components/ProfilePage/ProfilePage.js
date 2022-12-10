import Page from "../common/Page";
import classes from "./ProfilePage.module.css";
import {useState, useEffect, useContext, useRef} from "react"
import {getCurrentUser, updateProfile} from '../../../api/UserApi'
import AuthContext from '../../../store/auth-context';
import { getDistrict, getProvince, getWard } from "../../../api/ProvinceApi";
import Popup from "../common/Popup/Popup"
import {Link} from "react-router-dom"

const ProfilePage = () => {
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(false)
    const [cityData, setCityData] = useState([])
    const [districtData, setDistrictData] = useState([])
    const [wardData, setWardData] = useState([])
    const imageRef = useRef()
    
    const [popup, setPopup] = useState(false)
    const [reload, setReload] = useState(false)
    
    const [popupTitle, setPopupTitle] = useState('Change password successfully')
    const [popupDetail, setPopupDetail] = useState('Your password has been updated')
    
    const authCtx = useContext(AuthContext)
    
    const toggleEdit = () => {
        setEdit(prevState => !prevState)
    }
    
    const [values, setValues] = useState({
        email: '',
        phone: '',
        city: '1',
        district: '1',
        ward: '1',
        linkfb: '',
        linkin: '',
        linktw: '',
        linkli: '',
    })
    
    const {email, phone, city, district, ward, linkfb, linkin, linktw, linkli} = values
    
    const handleChange = (key) => {
        return (event) => {
            setValues({...values, [key]: event.target.value})
        }
    }
    
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
        if(authCtx.isLoggedIn){
            getCurrentUser(authCtx.token)
            .then((data) => {
                setUser(data);
                setValues({
                    email: data.email,
                    phone: data.phone,
                    city: '1',
                    district: '1',
                    ward: '1',
                    linkfb: data.linkfb,
                    linkin: data.linkin,
                    linktw: data.linktw,
                    linkli: data.linkli,
                })
            })
            .catch((err) => {
                alert(err.message);
            });
        }
    }, [reload])
    
    const reloadPage = () => {
        setReload(preState => !preState)
        setPopup(false);
        toggleEdit()
    }
    
    const submitHandler = () => {
        const cityInput = cityData.find(c => c.value == city).text
        const districtInput = districtData.find(d => d.value == district).text
        const wardInput = wardData.find(w => w.value == ward).text
        
        const data = {
            email: email,
            phone: phone,
            city: cityInput,
            district: districtInput,
            ward: wardInput,
            linkfb: linkfb,
            linkin: linkin,
            linktw: linktw,
            linkli: linkli,
            image: imageRef.current.files[0],
        }
        
        updateProfile(authCtx.token, data)
        .then((response) => {
            if(response.status === 400) {
                setPopupTitle(response.statusText)
                setPopupDetail(response.data)
                setPopup(true)
            }
            if(response.status === 200){
                setPopupTitle('Update successfully')
                setPopupDetail('Your profile has been updated.')
                setPopup(true)
            }
            toggleEdit()
        })
        .catch((err) => {
            console.error(err);
        });
    }
    
  return (
    <Page>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <div className={classes.profile}>
            <h2>Identify</h2>
            <div className={classes.content_box}>
                <div className={classes.profile_img}>
                    <img src={user.image}/>
                    {!edit && <button className={classes.profile_btn} onClick={toggleEdit}>Edit</button>}
                    {edit && <input type="file" required ref={imageRef}/>}
                    {edit && <button className={classes.profile_btn} onClick={submitHandler}>Submit</button>}
                </div>
                <table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>:</td>
                        {!edit && <td>{user.email}</td>}
                        {edit && <td><input type="text" required value={email} onChange={handleChange('email')}/></td>}
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>:</td>
                        {!edit && <td>{user.city}</td>}
                        {edit && <td>
                            <select 
                                value={city}
                                onChange={handleChange('city')}
                            >
                                {cityData.map(city => <option value={city.value} onChange={handleChange('city')}>{city.text}</option>)}
                            </select>
                        </td>}
                    </tr>
                    <tr>
                        <td>District</td>
                        <td>:</td>
                        {!edit && <td>{user.district}</td>}
                        {edit && <td>
                            <select 
                                value={district}
                                onChange={handleChange('district')}
                            >
                                {districtData.map(district => <option value={district.value} onChange={handleChange('district')}>{district.text}</option>)}
                            </select>
                            </td>}
                    </tr>
                    <tr>
                        <td>Ward</td>
                        <td>:</td>
                        {!edit && <td>{user.ward}</td>}
                        {edit && <td>
                            <select 
                                value={ward}
                                onChange={handleChange('ward')}
                            >
                                {wardData.map(ward => <option value={ward.value} onChange={handleChange('ward')}>{ward.text}</option>)}
                            </select>
                            </td>}
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>:</td>
                        {!edit && <td>{user.phone}</td>}
                        {edit && <td><input type="text" required value={phone} onChange={handleChange('phone')}/></td>}
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>:</td>
                        <td><Link className={classes.profile_link} to={'change_password'}>Change Password</Link></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <h2>SOCIAL MEDIA</h2>
            <div className={classes.content_box}>
                <table className={classes.social_box}>
                    <tbody>
                    <tr>
                        <div className={classes.facebook}>
                            <i className={`fa-brands fa-facebook-f ${classes.icon}`}></i>
                        </div>
                        <td>:</td>
                        {!edit && <td>{user.linkfb}</td>}
                        {edit && <td><input type="text" required value={linkfb} onChange={handleChange('linkfb')}/></td>}
                    </tr>
                    <tr>
                        <div className={classes.instagram}>
                            <i className={`fa-brands fa-instagram ${classes.icon}`}></i>
                        </div>
                        <td>:</td>
                        {!edit && <td>{user.linkin}</td>}
                        {edit && <td><input type="text" required value={linkin} onChange={handleChange('linkin')}/></td>}
                    </tr>
                    <tr>
                        <div className={classes.twitter}>
                            <i className={`fa-brands fa-twitter ${classes.icon}`}></i>
                        </div>
                        <td>:</td>
                        {!edit && <td>{user.linktw}</td>}
                        {edit && <td><input type="text" required value={linktw} onChange={handleChange('linktw')}/></td>}
                    </tr>
                    <tr>
                        <div className={classes.linkedin}>
                            <i className={`fa-brands fa-linkedin ${classes.icon}`}></i>
                        </div>
                        <td>:</td>
                        {!edit && <td>{user.linkli}</td>}
                        {edit && <td><input type="text" required value={linkli} onChange={handleChange('linkli')}/></td>}
                    </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      <Popup trigger={popup}>
                <h3>{popupTitle}</h3>
                <p>{popupDetail}</p>
            <button type="button" onClick={reloadPage}>Ok</button>
        </Popup>
    </Page>
  );
};

export default ProfilePage;