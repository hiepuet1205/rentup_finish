import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../../assets/img/logo.png";
import AuthContext from '../../../../store/auth-context';
import classes from "./Header.module.css";
import {getCurrentUser} from '../../../../api/UserApi'
import {getAllNotifications} from '../../../../api/NotificationApi'

const Data = [
    {
        text: "home",
        path: "/",
    },
    {
        text: "type",
        path: "/type",
    },
    {
        text: "post",
        path: "/post",
    },
    
]

const Header = () => {
    const history = useHistory()
    
    const authCtx = useContext(AuthContext)
    
    const [navList, setNavList] = useState(false)
    const [user, setUser] = useState({})
    const [notification, setNotification] = useState([])
    const [switchRole, setSwitchRole] = useState(authCtx.role != 'user')
    
    useEffect(() => {
        if(authCtx.isLoggedIn){
            getCurrentUser(authCtx.token)
            .then((data) => {
                setUser({
                    username: data.username,
                    balance: data.balance
                })
            })
            .catch((err) => {
                alert(err.message);
            });
        }
    }, [authCtx])
    
    useEffect(() => {
        if(authCtx.isLoggedIn){
            getAllNotifications(authCtx.token)
            .then((data) => {
                const temp = []
                data.forEach(data => {
                    temp.push({
                        created_at: data.created_at.substring(0, 10),
                        message: data.message
                    })
                })
                setNotification(temp)
            })
            .catch((err) => {
                alert(err.message);
            });
        }
    }, [authCtx])
    
    useEffect(() => {
        authCtx.changeRole(switchRole)
    }, [switchRole])
    
    const logoutHandler = () => {
        authCtx.logout();
        history.replace("/signin")
    }
    
    const toggleRole = () => {
        setSwitchRole(preState => !preState)
    }
    
    return (
        <header>
            <div className={`${classes.container} ${classes.flex}`}>
                <div> 
                    <img src={logo} alt='logo' />
                </div>
                <div className={classes.nav}>
                    <ul className={classes.flex}>
                        {Data.map((list, index) => (
                            <li key={index}>
                                <Link to={list.path}>{list.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classes.nav}>
                    <ul className={navList ? classes.small : classes.hidden}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link>Balance: {user.balance} <i class="fa-solid fa-coins"></i></Link></li>
                        <li><Link to={"/profile"}>Profile</Link></li>
                        {authCtx.role === 'landlord' && 
                            <Fragment>
                                <li><Link to={"/manage"}>My List</Link></li>
                                <li><Link to={"/manage/rent_request"}>Rent Request</Link></li>
                            </Fragment>
                        }
                        {authCtx.role === 'user' && 
                            <Fragment>
                                <li><Link to={"/manage/my_rent"}>My rent</Link></li>
                                <li><Link to={"/manage/your_request"}>My Request</Link></li>
                            </Fragment>
                        }
                        <li><Link onClick={logoutHandler}>Logout</Link></li>
                    </ul>
                </div>
                <div className={`${classes.button} ${classes.flex} ${classes.account}`}>
                    {user &&
                        <div className={classes.switchRole}>
                            <p>User</p>
                            <div className={classes.switchRole_main}>
                                <input type="checkbox" hidden="hidden" id="username" onChange={toggleRole} defaultChecked={switchRole}/>
                                <label className={classes.switch} for="username"></label>
                            </div>
                            <p>Landlord</p>
                        </div>
                    } 
                    {user &&
                        <div className={classes.notification}>
                            <i class="fa-solid fa-bell"></i>
                            ({notification.length})    
                            <ul className={classes.navbar_notifications}>
                                {notification.map((item, index) =>
                                    <li>
                                        <p>{item.created_at}</p>
                                        <h2>{item.message}</h2>
                                    </li>
                                )}
                            </ul>
                        </div>
                    } 
                    {user && 
                        <Fragment>
                            
                            <Link className={classes.signin}>
                                {user.username}
                                <ul className={classes.navbar_account}>
                                    <li><Link>Balance: {user.balance} <i class="fa-solid fa-coins"></i></Link></li>
                                    <li><Link to={"/profile"}>Profile</Link></li>
                                    {authCtx.role === 'landlord' && 
                                        <Fragment>
                                            <li><Link to={"/manage"}>My List</Link></li>
                                            <li><Link to={"/manage/rent_request"}>Rent Request</Link></li>
                                        </Fragment>
                                    }
                                    {authCtx.role === 'user' && 
                                        <Fragment>
                                            <li><Link to={"/manage/my_rent"}>My rent</Link></li>
                                            <li><Link to={"/manage/your_request"}>My Request</Link></li>
                                        </Fragment>
                                    }
                                    <li><Link onClick={logoutHandler}>Logout</Link></li>
                                </ul>
                            </Link>
                        </Fragment>
                    }
                    
                    {!user && 
                        <Link to="/signin" className={classes.signin}>
                            <i className='fa fa-sign-out'></i> Sign In
                        </Link>
                    }
                </div>

                <div className={classes.toggle}>
                    <button onClick={() => setNavList(!navList)}>
                        {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;