import Back from "../../common/Back/Back"
import img from "../../../../assets/img/backgroundPost.jpg"
import classes from "./YourRequest.module.css"
import YourRequestCard from "./YourRequestCard"
import { useState, useEffect, useContext } from "react"
import AuthContext from '../../../../store/auth-context';
import {getAllRentRequestFromTenant} from "../../../../api/RentRequestApi"
import axios from "axios"

const ManagerHouse = () => {
    const authCtx = useContext(AuthContext)
    
    const [requests, setRequests] = useState([])
    const [nextLink, setNextLink] = useState()
    const [prevLink, setPrevLink] = useState()
    
    const [reload, setReload] = useState(false)
    
    const toggleReload = () => {
        setReload(preState => !preState)
    }
    
    useEffect(() => {
        getAllRentRequestFromTenant(authCtx.token)
        .then((data) => {
            const tempData = []
            data.results.forEach(item => {
                tempData.push({
                    room: {
                        room_id: item.room.id,
                        room_name: item.room.name,
                        cover: item.room.image,
                        category: item.room.category.name,
                        city: item.room.house.city,
                        district: item.room.house.district,
                        ward: item.room.house.ward,
                        totalPrice: item.room.totalPrice
                    },
                    landlord: {
                        name: item.landlord.username,
                        cover: item.landlord.image,
                        address: item.landlord.city + ' - ' + item.landlord.district + ' - ' + item.landlord.ward,
                        linkfb: item.landlord.linkfb,
                        linkin: item.landlord.linkin,
                        linktw: item.landlord.linktw,
                        linkli: item.landlord.linkli,
                    },
                    message: item.message,
                    id: item.id,
                })
            })
            setRequests(tempData)
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
                        room: {
                            room_id: item.room.id,
                            room_name: item.room.name,
                            cover: item.room.image,
                            category: item.room.category.name,
                            city: item.room.house.city,
                            district: item.room.house.district,
                            ward: item.room.house.ward,
                            totalPrice: item.room.totalPrice
                        },
                        landlord: {
                            name: item.landlord.username,
                            cover: item.landlord.image,
                            address: item.landlord.city + ' - ' + item.landlord.district + ' - ' + item.landlord.ward,
                            linkfb: item.landlord.linkfb,
                            linkin: item.landlord.linkin,
                            linktw: item.landlord.linktw,
                            linkli: item.landlord.linkli,
                            phone: item.landlord.phone,
                        },
                        message: item.message,
                        id: item.id,
                    })
                })
                setRequests(temp)
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
            <Back name='Rent Request' title='Your Rent Request' cover={img}/>
            <section className={`${classes.recent} ${classes.padding}`}>
                <div className={classes.container}>
                    <div className={`${classes.grid1} ${classes.mtop}`}>
                        {requests.map((item, index) => <YourRequestCard item={item} index={index} reload={toggleReload}/>)}
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