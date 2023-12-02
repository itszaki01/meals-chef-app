import "./HomePage.scss";
import MealsList from "../../components/MealsList/MealsList";
export default function HomePage() {
    return (
        <>
            <div className="home-page-container">
                <h1>Suggestd For You</h1>
                <MealsList />
            </div>
        </>
    );
}
