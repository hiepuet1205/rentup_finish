import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getAllConfirmRequestFromTenant } from "../../../../api/RentRequestApi";
import img from "../../../../assets/img/backgroundPost.jpg";
import AuthContext from '../../../../store/auth-context';
import Back from "../../common/Back/Back";
import classes from "./ManageRent.module.css";
import RoomCard from "./RentCard";
import axios from "axios"

const ManagerRent = () => {
    const params = useParams()

    const id = params.id
    
    const authCtx = useContext(AuthContext)
    
    const [rooms, setRooms] = useState([])
    const [nextLink, setNextLink] = useState()
    const [prevLink, setPrevLink] = useState()
    
    useEffect(() => {
        getAllConfirmRequestFromTenant(authCtx.token)
        .then((data) => {
            console.log(data)
            const tempData = []
            data.results.forEach(item => {
                tempData.push({
                    id: item.room.id,
                    cover: item.room.image,
                    location: `${item.room.city} - ${item.room.district} - ${item.room.ward}`,
                    category: item.room.category.name,
                    status: item.room.status,
                    active: item.room.active,
                    detail: item.room.detail,
                    area: item.room.area,
                    rent_price: item.room.rentPrice,
                    water_price: item.room.waterPrice,
                    electricity_price: item.room.electricPrice,
                    service_price: item.room.servicePrice,
                    totalPrice: item.room.totalPrice,
                    expriedAt: item.expires_at.substring(0, 10)
                })
            })
            setRooms(tempData)
            setNextLink(data.next)
            setPrevLink(data.previous)
        })
        .catch((err) => {
                alert(err.message);
        });
    }, [])
    
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
                        id: item.room.id,
                        cover: item.room.image,
                        location: `${item.room.city} - ${item.room.district} - ${item.room.ward}`,
                        category: item.room.category.name,
                        status: item.room.status,
                        active: item.room.active,
                        detail: item.room.detail,
                        area: item.room.area,
                        rent_price: item.room.rentPrice,
                        water_price: item.room.waterPrice,
                        electricity_price: item.room.electricPrice,
                        service_price: item.room.servicePrice,
                        totalPrice: item.room.totalPrice,
                        expriedAt: item.expires_at.substring(0, 10)
                    })
                })
                setRooms(temp)
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
            <Back name='Room' title='Room Grid - Our Rooms' cover={img}/>
            <section className={`${classes.recent} ${classes.padding}`}>
                <div className={classes.container}>
                    <div className={`${classes.grid3} ${classes.mtop}`}>
                        {rooms.map((item, index) => <RoomCard item={item} index={index}/>)}
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

export default ManagerRent;