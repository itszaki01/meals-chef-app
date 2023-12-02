import "./NavBar.scss";
import { Link, NavLink } from "react-router-dom";
import NavBarIcons from "./NavBarIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { CSSProperties } from "react";
import { motion } from "framer-motion";
import logo from '/src/assets/logo.png'
export default function NavBar() {
    //ACTIVE LINK STYLE (DESKTOP)
    function linkActive({ isActive }: { isActive: boolean }): CSSProperties {
        if (isActive) {
            return {
                textDecoration: "underline",
                color: "#f0bf26",
            };
        } else {
            return {};
        }
    }

    //...(MOBILDE AND TABLET)
    function linkActiveMobile({ isActive }: { isActive: boolean }): CSSProperties {
        if (isActive) {
            return {
                display: "none",
            };
        } else {
            return {
                position: "relative",
            };
        }
    }

    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{duration:1}}>
            <div className="nav-bar-container">
                <ul>
                    <li>
                        <Link to={""}>
                            <img src={logo} alt="logo" />
                            <p>Meals Chef</p>
                        </Link>
                    </li>
                    <li>
                        <NavLink to={"/add-new"} className="add-new-btn" style={linkActive}>
                            ADD NEW
                        </NavLink>
                        {/* Responsive Add New Btn */}
                        <NavLink to={"/add-new"} style={linkActiveMobile}>
                            <FontAwesomeIcon icon={faCirclePlus} className="responsive-add-new-btn" />
                        </NavLink>
                    </li>
                </ul>
                {/* NAV BAR ICONS COMPONENT */}
                <NavBarIcons />
            </div>
        </motion.nav>
    );
}
