import { Fragment } from "react";
import classes from "./Footer.module.css";
import logoLight from "../../../../assets/img/logo-light.png"

const data = [
    {
        title: "LAYOUTS",
        text: [{ list: "Home Page" }, { list: "About Page" }, { list: "Service Page" }, { list: "Property Page" }, { list: "Contact Page" }, { list: "Single Blog" }],
    },
    {
        title: "ALL SECTIONS",
        text: [{ list: "Headers" }, { list: "Features" }, { list: "Attractive" }, { list: "Testimonials" }, { list: "Videos" }, { list: "Footers" }],
    },
    {
        title: "COMPANY",
        text: [{ list: "About" }, { list: "Blog" }, { list: "Pricing" }, { list: "Affiliate" }, { list: "Login" }, { list: "Changelog" }],
    },
]

const Footer = () => {
    return (
        <Fragment>
            <footer className={classes.footer}>
                <div className={classes.container}>
                    <div>
                        <div>
                            <img src={logoLight} alt='Logo-light' />
                            <h2>Do You Need Help With Anything?</h2>
                            <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>
                
                            <div className={classes.flex}>
                                <input type='text' placeholder='Email Address' />
                                <button>Subscribe</button>
                            </div>
                        </div>
                    </div>
        
                    {data.map((val) => (
                        <div>
                            <h3>{val.title}</h3>
                            <ul>
                                {val.text.map((items) => (
                                <li> {items.list} </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </footer>
        </Fragment>
      )
}

export default Footer;