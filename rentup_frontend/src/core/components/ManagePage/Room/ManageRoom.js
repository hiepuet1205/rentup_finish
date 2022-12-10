import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getRoomListOfHouse } from "../../../../api/RoomApi";
import img from "../../../../assets/img/backgroundPost.jpg";
import AuthContext from '../../../../store/auth-context';
import Back from "../../common/Back/Back";
import classes from "./ManageRoom.module.css";
import RoomCard from "./RoomCard";
import axios from "axios"

const ManagerRoom = () => {
    const params = useParams()

    const id = params.id
    
    const authCtx = useContext(AuthContext)
    
    const [rooms, setRooms] = useState([])
    const [nextLink, setNextLink] = useState()
    const [prevLink, setPrevLink] = useState()
    
    const [reload, setReload] = useState(false)
    
    const toggleReload = () => {
        setReload(preState => !preState)
    }
    
    useEffect(() => {
        getRoomListOfHouse(id, authCtx.token)
        .then((data) => {
            const tempData = []
            data.results.forEach(item => {
                tempData.push({
                    id: item.id,
                    cover: item.image,
                    location: `${item.city} - ${item.district} - ${item.ward}`,
                    category: item.category.name,
                    status: item.status,
                    active: item.active,
                    detail: item.detail,
                    area: item.area,
                    rent_price: item.rentPrice,
                    water_price: item.waterPrice,
                    electricity_price: item.electricPrice,
                    service_price: item.servicePrice,
                    totalPrice: item.totalPrice,
                })
            })
            setRooms(tempData)
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
                        status: item.status,
                        active: item.active,
                        detail: item.detail,
                        area: item.area,
                        rent_price: item.rentPrice,
                        water_price: item.waterPrice,
                        electricity_price: item.electricPrice,
                        service_price: item.servicePrice,
                        totalPrice: item.totalPrice,
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
                        {rooms.map((item, index) => <RoomCard item={item} index={index} reload={toggleReload}/>)}
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

export default ManagerRoom;