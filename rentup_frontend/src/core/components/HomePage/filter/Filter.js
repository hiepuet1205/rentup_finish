import classes from "./Filter.module.css"
import Heading from "../../common/Heading/Heading"
import {useState, useEffect} from "react"
import {getProvince, getDistrict, getWard} from "../../../../api/ProvinceApi"
import {getAllCategory} from "../../../../api/CategoryApi"

const Filter = (props) => {
    const [cityData, setCityData] = useState([])
    const [districtData, setDistrictData] = useState([])
    const [wardData, setWardData] = useState([])
    const [typeData, setTypeData] = useState([])
    
    const [values, setValues] = useState({
        city: '1',
        district: '1',
        ward: '1',
        type: '0',
        priceMin: 0,
        priceMax: 0
    })
    
    const {city, district, ward, type, priceMin, priceMax} = values
    
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
        getAllCategory()
        .then((data) => {
            const temp = []
            data.forEach(data => {
                temp.push({
                    text: data.name,
                    img: data.image,
                    value: data.id,
                })
            })
            setTypeData(temp)
        })
        .catch((err) => {
            alert(err.message);
        });
    }, [])
    
    const handleChange = (key) => {
        return (event) => {
            setValues({...values, [key]: event.target.value})
        }
    }
    
    const submitHandler = (event) => {
        event.preventDefault()
        
        const cityInput = cityData.find(c => c.value == city).text
        const districtInput = districtData.find(d => d.value == district).text
        const wardInput = wardData.find(w => w.value == ward).text
        const categoryInput = typeData.find(t => t.value == type).text

        const filter = {
            category: categoryInput,
            city: cityInput,
            district: districtInput,
            ward: wardInput,
            min_price: priceMin,
            max_price: priceMax
        }

        props.handleFilter(filter)
    }
    
    return (
        <section className={classes.filter}>
            <div className={classes.container}>
            <Heading title='Search Your Next Home ' subtitle='Find new & featured property located in your local city.' />

            <form className={classes.flex}>
                <div className={classes.box}>
                    <span>City</span>
                    <select 
                        id="city" 
                        name="city" 
                        value={city}
                        onChange={handleChange('city')}
                    >
                        {cityData.map(city => <option value={city.value}>{city.text}</option>)}
                    </select>
                </div>
                <div className={classes.box}>
                    <span>District</span>
                    <select 
                        id="district" 
                        name="district"
                        value={district}
                        onChange={handleChange('district')}
                    >
                        {districtData.map(district => <option value={district.value}>{district.text}</option>)}
                    </select>
                </div>
                <div className={classes.box}>
                    <span>Ward</span>
                    <select 
                        id="ward" 
                        name="ward"
                        value={ward}
                        onChange={handleChange('ward')}
                    >
                        {wardData.map(ward => <option value={ward.value}>{ward.text}</option>)}
                    </select>
                </div>
                <div className={classes.box}>
                    <span>Property Type</span>
                    <select 
                        id="type" 
                        name="type"
                        value={type}
                        onChange={handleChange('type')}
                    >
                        {typeData.map(type => <option value={type.value}>{type.text}</option>)}
                    </select>
                </div>
                <div className={classes.box}>
                    <span>Price Min</span>
                    <input 
                        type='number' 
                        placeholder='Price Min'
                        value={priceMin}
                        onChange={handleChange('priceMin')}
                    />
                </div>
                <div className={classes.box}>
                    <span>Price Max</span>
                    <input 
                        type='number' 
                        placeholder='Price Max'
                        value={priceMax}
                        onChange={handleChange('priceMax')}
                    />
                </div>
                <div className={classes.box}>
                    <h4>Advance Filter</h4>
                </div>
                <button type="submit" onClick={submitHandler}>
                    <i className='fa fa-search'></i>
                </button>
            </form>
            </div>
        </section>
    )
}

export default Filter;