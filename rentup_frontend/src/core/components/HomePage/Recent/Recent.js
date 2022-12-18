import Heading from "../../common/Heading/Heading"
import RecentCard from "./RecentCard"
import classes from "./Recent.module.css"
import {useState, useEffect} from "react"
import {getAllRoomAvailable} from '../../../../api/RoomApi'
import axios from "axios"

const Recent = (props) => {
    const [data, setData] = useState([])
    const [nextLink, setNextLink] = useState()
    const [prevLink, setPrevLink] = useState()
    
    useEffect(() => {
        getAllRoomAvailable(props.filter)
        .then((data) => {
            const temp = []
            data.results.forEach(data => {
                temp.push({
                    room_id: data.id,
                    room_name: data.name,
                    cover: data.image,
                    category: data.category.name,
                    city: data.house.city,
                    district: data.house.district,
                    ward: data.house.ward,
                    totalPrice: data.totalPrice
                })
            })
            setData(temp)
            setNextLink(data.next)
            setPrevLink(data.previous)
        })
        .catch((err) => {
            alert(err.message);
        });
    }, [props.filter])
    
    const handlePagination = (url) => {
        try{
            axios.get(url)
            .then((response) =>{
                const temp = []
                response.data.results.forEach(data => {
                    temp.push({
                        room_id: data.id,
                        room_name: data.house.detail,
                        cover: data.image,
                        category: data.category.name,
                        city: data.house.city,
                        district: data.house.district,
                        ward: data.house.ward,
                        totalPrice: data.totalPrice
                    })
                })
                setData(temp)
                setNextLink(response.data.next)
                setPrevLink(response.data.previous)
            })
        }
        catch(e){
            console.log(e)
        }
    }
  
    return (
        <section className={`${classes.recent} ${classes.padding}`}>
            <div className={classes.container}>
                <Heading title='Recent Property Listed' subtitle='Find new & featured property located in your local city.' />
                <div className={`${classes.grid3} ${classes.mtop}`}>
                    {data.map((item, index) => <RecentCard item={item} index={index}/>)}
                </div>
                <div className={classes.paginations}>
                    {prevLink && <button className={classes.previous} onClick={()=>handlePagination(prevLink)}>Previous</button>}
                    {nextLink && <button className={classes.next} onClick={()=>handlePagination(nextLink)}>Next</button>}
                </div>
            </div>
        </section>
    )
}

export default Recent