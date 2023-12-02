import "./Footer.scss";
import logoBlack from "/src/assets/logo-black.png"
export default function Footer() {
    return (
        <footer className="animate__animated animate__fadeInLeft">
            <img src={logoBlack} alt="footer-black-logo" width={"60px"} />
            <h1>MEALS CHEF</h1>

        </footer>
    );
}
