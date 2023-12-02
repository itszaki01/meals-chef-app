import { useEffect, useState } from "react";
import "./Error404Page.scss";
import { useNavigate } from "react-router-dom";
import error404png from "/src/assets/404.png"
export default function Error404Page() {
    const [countDown, setCountDown] = useState<number>(5);
    const navigate = useNavigate()
    useEffect(() => {
        const counter = setInterval(() => {
            setCountDown((c): number => {
                if (c == 1) {
                    clearInterval(counter);
                    navigate("/")
                }
                return c - 1;
            });
        }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="error404-page-container">
            <img src={error404png} alt="error image" width={"300px"} />
            <h1>PAGE NOT FOUND</h1>
            <h3>
                Redirect To Home Page in <span>{countDown}s</span>
            </h3>
        </div>
    );
}
