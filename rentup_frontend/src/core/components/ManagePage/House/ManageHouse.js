import Back from "../../common/Back/Back"
import img from "../../../../assets/img/backgroundPost.jpg"
import classes from "./ManageHouse.module.css"
import HouseCard from "./HouseCard"
import { useState, useEffect, useContext } from "react"
import AuthContext from '../../../../store/auth-context';
import {getOwnedHouseApi} from "../../../../api/HouseApi"
import axios from "axios"

const ManagerHouse = () => {
    const authCtx = useContext(AuthContext)
    
    const [houses, setHouses] = useState([])
    const [nextLink, setNextLink] = useState()
    const [prevLink, setPrevLink] = useState()
    const [reload, setReload] = useState(false)
    
    const toggleReload = () => {
        setReload(preState => !preState)
    }
    
    useEffect(() => {
        getOwnedHouseApi(authCtx.token)
        .then((data) => {
            const tempData = []
            data.results.forEach(item => {
                tempData.push({
                    id: item.id,
                    cover: item.image,
                    location: `${item.city} - ${item.district} - ${item.ward}`,
                    category: item.category.name,
                })
            })
            setHouses(tempData)
            setNextLink(data.next)
            setPrevLink(data.previous)
        })
        .catch((err) => {
                alert(err.message);
        });
    }, [reload])
    
    const handlePagination = (url) => {
        try{
            axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${authCtx.token}`
                }
            })
            .then((response) =>{
                const temp = []
                response.data.results.forEach(item => {
                    temp.push({
                        id: item.id,
                        cover: item.image,
                        location: `${item.city} - ${item.district} - ${item.ward}`,
                        category: item.category.name,
                    })
                })
                setHouses(temp)
                setNextLink(response.data.next)
                setPrevLink(response.data.previous)
            })
        }
        catch(e){
            console.log(e)
        }
    }
  
  
    return (
        <section>
            <Back name='House' title='House Grid - Our Houses' cover={img} path="/add-house" action="Add House"/>
            <section className={`${classes.recent} ${classes.padding}`}>
                <div className={classes.container}>
                    <div className={`${classes.grid3} ${classes.mtop}`}>
                        {houses.map((item, index) => <HouseCard item={item} index={index} reload={toggleReload}/>)}
                    </div>
                    <div className={classes.paginations}>
                        {prevLink && <button className={classes.previous} onClick={()=>handlePagination(prevLink)}>Previous</button>}
                        {nextLink && <button className={classes.next} onClick={()=>handlePagination(nextLink)}>Next</button>}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default ManagerHouse;