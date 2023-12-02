import "./NavBarIcons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { useTotals } from "../../hooks/useTotals";
export default function NavBarIcons() {
    const { totalOrders, totalPrice } = useTotals();
    return (
        <div className="nav-icons">
            <div>
                <FontAwesomeIcon icon={faCartShopping} className="icon" />
                {totalOrders != 0 ? <div className="badge cart">{totalOrders}</div> : ""}
            </div>
            <div>
                <FontAwesomeIcon icon={faWallet} className="icon" />
                {totalPrice != 0 ? <div className="badge">${totalPrice}</div> : ""}
            </div>
        </div>
    );
}
