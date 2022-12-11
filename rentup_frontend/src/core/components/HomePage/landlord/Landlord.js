import LandlordCard from "./LandlordCard"
import Heading from "../../common/Heading/Heading"
import classes from "./Landlord.module.css"
import {useState, useEffect} from "react"
import {getAllUsers} from '../../../../api/UserApi'
import axios from "axios"

const Landlord = () => {
    const [data, setData] = useState([])
    const [nextLink, setNextLink] = useState()
    const [prevLink, setPrevLink] = useState()
    
    const a = 1
    
    useEffect(() => {
        getAllUsers()
        .then((data) => {
            const temp = []
            data.forEach(data => {
                temp.push({
                    name: data.username,
                    cover: data.image,
                    address: data.city + ' - ' + data.district + ' - ' + data.ward,
                    linkfb: data.linkfb,
                    linkin: data.linkin,
                    linktw: data.linktw,
                    linkli: data.linkli,
                    phone: data.phone
                })
            })
            setData(temp)
            setNextLink(data.next)
            setPrevLink(data.previous)
        })
        .catch((err) => {
            alert(err.message);
        });
    }, [a])
    
    const handlePagination = (url) => {
        try{
            axios.get(url)
            .then((response) =>{
                const temp = []
                response.data.results.forEach(data => {
                    temp.push({
                        name: data.username,
                        cover: data.image,
                        address: data.city + ' - ' + data.district + ' - ' + data.ward,
                        linkfb: data.linkfb,
                        linkin: data.linkin,
                        linktw: data.linktw,
                        linkli: data.linkli,
                        phone: data.phone
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
        <section className={classes.landlord}>
            <div className={classes.container}>
                <Heading title='Our Featured Agents' subtitle='All real estate owners.' />

                <div className={`${classes.mtop} ${classes.grid3}`}>
                    {data.map((item, index) => <LandlordCard item={item} index={index}/>)}
                </div>
                <div className={classes.paginations}>
                    {prevLink && <button className={classes.previous} onClick={()=>handlePagination(prevLink)}>Previous</button>}
                    {nextLink && <button className={classes.next} onClick={()=>handlePagination(nextLink)}>Next</button>}
                </div>
            </div>
        </section>
    )
}

export default Landlord