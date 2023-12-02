import "./MealsList.scss";
import { Meal } from "../Meal/Meal";
import { useMealstData } from "../../hooks/useMealsData";
export default function MealsList() {
    //Destruct Meals-Data
    const { mealsData } = useMealstData();

    //AllMealsList
    const allMealsList = mealsData.map((meal): JSX.Element => {
        return <Meal key={meal.idMeal} mealsData={meal} />;
    });
    return (
        <div className="meals-list-container">
            {/* Wrapper */}
            <div className="meals-wrapper">{allMealsList}</div>
        </div>
    );
}
