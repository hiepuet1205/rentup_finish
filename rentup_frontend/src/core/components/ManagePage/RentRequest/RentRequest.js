import Back from "../../common/Back/Back"
import img from "../../../../assets/img/backgroundPost.jpg"
import classes from "./RentRequest.module.css"
import RentRequestCard from "./RentRequestCard"
import { useState, useEffect, useContext } from "react"
import AuthContext from '../../../../store/auth-context';
import {getAllRentRequestFromLandlord} from "../../../../api/RentRequestApi"
import axios from "axios"

const RentRequest = () => {
    const authCtx = useContext(AuthContext)
    
    const [requests, setRequests] = useState([])
    const [nextLink, setNextLink] = useState()
    const [prevLink, setPrevLink] = useState()
    
    const [reload, setReload] = useState(false)
    
    const toggleReload = () => {
        setReload(preState => !preState)
    }
    
    useEffect(() => {
        getAllRentRequestFromLandlord(authCtx.token)
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
                    tenant: {
                        name: item.tenant.username,
                        cover: item.tenant.image,
                        address: item.tenant.city + ' - ' + item.tenant.district + ' - ' + item.tenant.ward,
                        linkfb: item.tenant.linkfb,
                        linkin: item.tenant.linkin,
                        linktw: item.tenant.linktw,
                        linkli: item.tenant.linkli,
                    },
                    message: item.message,
                    id: item.id
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
                        tenant: {
                            name: item.tenant.username,
                            cover: item.tenant.image,
                            address: item.tenant.city + ' - ' + item.tenant.district + ' - ' + item.tenant.ward,
                            linkfb: item.tenant.linkfb,
                            linkin: item.tenant.linkin,
                            linktw: item.tenant.linktw,
                            linkli: item.tenant.linkli,
                        },
                        message: item.message,
                        id: item.id
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
                        {requests.map((item, index) => <RentRequestCard item={item} index={index} reload={toggleReload}/>)}
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

export default RentRequest;