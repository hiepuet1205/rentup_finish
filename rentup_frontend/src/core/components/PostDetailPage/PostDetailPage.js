import Page from "../common/Page"
import classes from "./PostDetailPage.module.css"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import {getRoomByRoomId} from '../../../api/RoomApi'
import {Link} from 'react-router-dom'

const PostDetailPage = () => {
    const params = useParams()

    const id = params.id
    
    const [post, setPost] = useState({})
    const [landlord, setLandlord] = useState({})
    
    useEffect(() => {
        getRoomByRoomId(id)
        .then((data) => {
            setPost({
                room_name: data.name,
                location: data.house.city + ' ' + data.house.district + ' ' + data.house.ward,
                room_type: data.category.name,
                detail: data.detail,
                rent_price: data.rentPrice,
                water_price: data.waterPrice,
                electricity_price: data.electricityPrice,
                service_price: data.servicePrice,
                totalPrice: data.totalPrice,
                image: data.image,
            })
            setLandlord({
                cover: data.house.landlord.image,
                name: data.house.landlord.username,
                address: data.house.landlord.city + ' - ' + data.house.landlord.district + ' - ' + data.house.landlord.ward,
                phone: data.house.landlord.phone,
                linkfb: data.house.landlord.linkfb,
                linkin: data.house.landlord.linkin,
                linktw: data.house.landlord.linktw,
                linkli: data.house.landlord.linkli,
                phone: data.house.landlord.phone,
            })
        })
        .catch((err) => {
            alert(err.message);
        });
    }, [id])
    
    return (
        <Page>
            <section class={classes.post}>
                <div class={`${classes.grid} ${classes.wide}`}>
                    <div class={`${classes.row} ${classes.nogutters}`}>
                        <div class={`${classes.col} ${classes.c6} ${classes.l12} ${classes.landlord}`}>
                            <div class={classes.landlordDetails}>
                                <button class={classes.btn3}>Landlord</button>
                                <div class={classes.details}>
                                    <div class={classes.img}>
                                        <img src={landlord.cover} alt='' />
                                        <i class='fa-solid fa-circle-check'></i>
                                    </div>
                                    <span>
                                        <i class='fa fa-location-dot'></i>
                                        <label>{landlord.address}</label>
                                        <h4>{landlord.name}</h4>
                                    </span>
                                    
                                    <ul>
                                        <a href={landlord.linkfb}><li><i class="fa-brands fa-facebook-f"></i></li></a>
                                        <a href={landlord.linkli}><li><i class="fa-brands fa-linkedin"></i></li></a>
                                        <a href={landlord.linktw}><li><i class="fa-brands fa-twitter"></i></li></a>
                                        <a href={landlord.linkin}><li><i class="fa-brands fa-instagram"></i></li></a>
                                    </ul>
            
                                    <div class={`${classes.button} ${classes.flex}`}>
                                        <button>
                                            <i class='fa fa-envelope'></i>
                                            Message
                                        </button>
                                        <button class={classes.btn4}>
                                            <a href={`tel:${landlord.phone}`}><i className='fa fa-phone-alt'></i></a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class={`${classes.col} ${classes.c6} ${classes.l12} ${classes.postdetail}`}>
                            <div class={classes.header}>
                                <div class={classes.headerdetail}>
                                    <h1>{post.room_name}</h1>
                                    <p><i class="fa fa-location-dot"></i>{post.location}</p>
                                </div>
                                <div class={classes.headercategory}>
                                    <button class={classes.btn3}>{post.room_type}</button>
                                </div>
                            </div>
                            <div class={classes.main}>
                                <img src={post.image} alt=""/>
                                <p class={classes.description}>{post.detail}</p>
                                <p>
                                    <i class="fa fa-money-check"></i> Rent price: {post.rent_price}đ / month
                                </p>
                                <p>
                                    <i class="fa fa-money-check"></i> Water price: {post.water_price}đ / month
                                </p>
                                <p>
                                    <i class="fa fa-money-check"></i> Electricity price: {post.electricity_price}đ / month
                                </p>
                                <p>
                                    <i class="fa fa-money-check"></i> Services price: {post.service_price}đ / month
                                </p>
                                <div class={classes.mainButton}>
                                    <button>{post.totalPrice}đ / month</button>
                                    <Link to={`/room/${id}/rent_register`}>Rent</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    )
}

export default PostDetailPage