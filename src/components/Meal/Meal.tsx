import "./Meal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { MealsDataType } from "../../types/MealsData.type";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useMealstData } from "../../hooks/useMealsData";
type MealProps = {
    mealsData: MealsDataType;
};

export const Meal = ({ mealsData }: MealProps) => {
    const { handleDeletMeal } = useMealstData();
    //handleViewDetialsIconClick
    function handleViewDetialsIconClick() {
        scrollTo(0, 0);
        const resetScroll: HTMLButtonElement | null = document.querySelector('[aria-label="slide item 1"]');
        if (resetScroll != null) {
            resetScroll.click();
        }
    }

    //handleUpdateMealIconClick
    function handleUpdateMealIconClick() {
        scrollTo(0, 0);
    }

    //handleDeletIconClick
    function handleDeleteIconClick() {
        Swal.fire({
            title: "Do you want to Delete the Meal?",
            showCancelButton: true,
            text: mealsData.strMeal,
            confirmButtonText: "Delete",
            confirmButtonColor: "#dc3545",
            icon: "warning",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Meal Deleted",
                    showConfirmButton: false,
                    timer: 1000,
                    icon: "success",
                });

                handleDeletMeal(mealsData.idMeal);
            }
        });
    }
    return (
        <div className="meal" id={mealsData.idMeal}>
            {mealsData.isNew && <span className="meal-new">NEW</span>}
            {mealsData.isUpdated && <span className="meal-updated">UPDATED</span>}
            <img src={`${mealsData.strMealThumb}`} alt="card-image" width={"100%"} height="160px" />

            <h4>{mealsData.strMeal}</h4>
            <div className="meal-price">$ {mealsData.price}</div>

            {/* HOVER OVERLAY & ICONS */}
            <div className="hover-card-overlay">
                <hr />
                <div className="hover-card-icons">
                    <Link to={`/meal-detials/${mealsData.idMeal}/${mealsData.strMeal}`} state={mealsData}>
                        <FontAwesomeIcon icon={faEye} className="icon" onClick={handleViewDetialsIconClick} />
                    </Link>
                    <Link to={`/update-meal/${mealsData.idMeal}/${mealsData.strMeal}`} state={mealsData}>
                        <FontAwesomeIcon icon={faPenToSquare} className="icon" onClick={handleUpdateMealIconClick} />
                    </Link>
                    <FontAwesomeIcon icon={faTrashCan} className="icon" onClick={handleDeleteIconClick} />
                </div>
            </div>
        </div>
    );
};
