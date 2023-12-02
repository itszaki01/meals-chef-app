import MealsList from "../../components/MealsList/MealsList";
import "./MealDetailsPage.scss";
import "./carousel.scss";
import { Carousel } from "react-responsive-carousel";
import { useLocation, useParams } from "react-router-dom";
import { MealsDataType } from "../../types/MealsData.type";
import { v4 as uuidv4 } from "uuid";
import { useTotals } from "../../hooks/useTotals";
import { useMealstData } from "../../hooks/useMealsData";
import Swal from "sweetalert2";
type Location = {
    state: MealsDataType;
};

export default function MealDetailsPage() {

    //Get Meals Data
    const { mealsData } = useMealstData();

    //Get Meal Id Param
    const { mealId } = useParams();

    //Passed State
    let { state }: Location = useLocation();
    const { totalPrice, totalOrders, setTotalOrders, setTotalPrice } = useTotals();

    // Condition Of Empty Data
    if (!state) {
        for (const meal of mealsData) {
            if (meal.idMeal === mealId) {
                state = meal;
            }
        }
    }

    //handleOrderNowClick
    function handleOrderNowClick() {
        setTotalOrders(totalOrders + 1);
        setTotalPrice(totalPrice + state.price);
        Swal.fire({
            title: "Thanks For Placing an order",
            icon: "success",
            showConfirmButton: false,
            timer:1500
            
        });
    }

    return (
        <div className="meal-details-page-container">
            <h1>Gredient Details</h1>
            <div className="ingrediants">
                <h2>{state.strMeal}</h2>
                <ul>
                    {state.ingredients.map((ingredient) => (
                        <li key={uuidv4()}>{ingredient.ingredient}</li>
                    ))}
                </ul>
                <button onClick={handleOrderNowClick}>
                    ORDER NOW <span>${state.price}</span>{" "}
                </button>
            </div>
            <div className="carousel">
                {state.mealPictures.length >= 1 ? (
                    <Carousel selectedItem={0}>
                        {state.mealPictures.map((image) => (
                            <img key={uuidv4()} src={`${image.mealPicture}`} alt="" />
                        ))}
                    </Carousel>
                ) : (
                    <h1>No Images For This Meal</h1>
                )}
            </div>
            <div className="more-meals">
                <h1>Discover More Meals</h1>
                <MealsList />
            </div>
        </div>
    );
}
