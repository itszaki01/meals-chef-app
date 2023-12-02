import "../add-new/AddNewMealPage.scss";
import './UpdateMealPage.scss'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Fragment } from "react";
import { MealsDataType } from "../../types/MealsData.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SingleImageInput from "../../components/SingleImageInput/SingleImageInput";
import Swal from "sweetalert2";
import { useMealstData } from "../../hooks/useMealsData";
import { useNavigate, useLocation, useParams } from "react-router-dom";

type Location = {
    state: MealsDataType;
};
export default function UpdateMealPage() {
    //useNavigation
    const navigate = useNavigate();
    const { handleUpdateMeal } = useMealstData();

    //Get Meals Data
    const { mealsData } = useMealstData();

    //Get Meal Id Param
    const { mealId } = useParams();

    //Passed State
    let { state }: Location = useLocation();

    console.log(state);
    
    // Condition Of Empty Data in { state }
    if (!state) {
        for (const meal of mealsData) {
            if (meal.idMeal === mealId) {
                state = meal;
            }
        }
    }

    //From Regiseters and Hooks
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<MealsDataType>({
        mode: "onChange",
        defaultValues: {
            mealPictures: state.mealPictures,
            ingredients: state.ingredients,
            idMeal: state.idMeal,
            strMeal: state.strMeal,
            strMealThumb: state.strMealThumb,
            price: state.price,
            isUpdated: true,
            isNew:false
        },
    });

    //Pictrues Fields Array
    const {
        fields: picturesFields,
        append: picturesAppend,
        remove: picturesRemove,
    } = useFieldArray<MealsDataType>({
        control,
        name: "mealPictures",
    });

    //Ingrediant Fielfs Array
    const {
        fields: ingredientsFields,
        append: ingredientsAppend,
        remove: ingredientsRemove,
    } = useFieldArray<MealsDataType>({
        control,
        name: "ingredients",
    });

    //onSubmit From
    const onSubmit: SubmitHandler<MealsDataType> = (data) => {
        Swal.fire({
            title: "Meal Updated Successfuly",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
        });
        handleUpdateMeal(data);
        console.log('UPDATED',data);
        
        navigate("/");
        scrollTo(0, 0);
    };

    return (
        <>
            <form className="add-new-meal-page-form" onSubmit={handleSubmit(onSubmit)}>
                {/* ================ SECTION 1 ======================== */}
                <section className="ingrediant-details-section-1">
                    <div className="input-div">
                        <h1>UPDATE MEAL</h1>
                        <label htmlFor="">Meal Name</label>
                        <input
                            autoComplete="none"
                            type="text"
                            placeholder="Meal Name"
                            {...register("strMeal", {
                                minLength: {
                                    value: 3,
                                    message: "Min Length Is 3 characters",
                                },
                                required: "Meal Name is Required",
                            })}
                        />
                        <p className="error-input-msg">{errors.strMeal?.message}</p>
                    </div>
                    {/*THUMB IMAGE INPUT*/}
                    <div className="input-div">
                        <label htmlFor="">Meal Thumb</label>
                        <input
                            autoComplete="none"
                            type="url"
                            placeholder="Meal Thumb URL"
                            {...register("strMealThumb", {
                                pattern: {
                                    value: /(https?:\/\/.*\.(?:png|jpg|gif))/,
                                    message: "URL: Allowed Images (png,jpg,gif,jpge)",
                                },
                                required: "Meal Thumb is Required",
                            })}
                        />
                        <p className="error-input-msg">{errors.strMealThumb?.message}</p>
                        <p id="thumb-image" className="error-input-msg"></p>
                    </div>
                    {/* PRICE INPUT */}
                    <div className="input-div">
                        <label htmlFor="">Meal Price</label>
                        <input
                            autoComplete="none"
                            type="number"
                            placeholder="Meal Price"
                            {...register("price", {
                                valueAsNumber:true,
                                min: {
                                    value: 1,
                                    message: "Minimal Price is 1",
                                },
                                max: {
                                    value: 10000,
                                    message: "Max Price is 10000",
                                },
                                required: "Price is Required",
                            })}
                        />
                        <p className="error-input-msg">{errors.price?.message}</p>
                    </div>

                    {/* INGREDIANTS FIELD ARRAY */}
                    <div className="meal-ingrediants-filed-inputs">
                        <label>Ingrediants</label>
                        <ul>
                            {ingredientsFields.map((item, index) => {
                                return (
                                    <Fragment key={item.id}>
                                        <li>
                                            <input
                                                {...register(`ingredients.${index}.ingredient`, {
                                                    required: "is Required",
                                                    minLength: {
                                                        value: 5,
                                                        message: "Mini Length is 5 characters",
                                                    },
                                                })}
                                                type="text"
                                                placeholder={`New Ingrediant ${index + 1}`}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="delet-input-icon"
                                                style={{ display: watch("ingredients").length == 1 ? "none" : "block" }}
                                                onClick={() => ingredientsRemove(index)}
                                            />
                                        </li>
                                        <p className="error-input-msg">{errors.ingredients?.[index]?.ingredient?.message}</p>
                                    </Fragment>
                                );
                            })}
                        </ul>
                        <FontAwesomeIcon icon={faSquarePlus} className="add-picture-btn" onClick={() => ingredientsAppend({ ingredient: "" })} />
                    </div>

                    {/* MEALS THUMB WRAPPER */}
                    <div className="meal-pictrues-filed-inputs">
                        <label>Meal Pics</label>
                        <ul>
                            {picturesFields.map((item, index) => {
                                return (
                                    <Fragment key={item.id}>
                                        <li>
                                            <input
                                                {...register(`mealPictures.${index}.mealPicture`, {
                                                    required: "is required",
                                                    pattern: {
                                                        value: /(https?:\/\/.*\.(?:png|jpg|gif))/,
                                                        message: "URL: Allowed Images (png,jpg,gif,jpge)",
                                                    },
                                                })}
                                                type="url"
                                                placeholder={`New Picture ${index + 1}`}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                style={{ display: watch("mealPictures").length == 1 ? "none" : "block" }}
                                                className="delet-input-icon"
                                                onClick={() => picturesRemove(index)}
                                            />
                                        </li>
                                        <p className="error-input-msg">{errors.mealPictures?.[index]?.mealPicture?.message}</p>
                                        <p id={`p-error-${index}`} className="error-input-msg"></p>
                                    </Fragment>
                                );
                            })}
                        </ul>
                        <FontAwesomeIcon icon={faSquarePlus} className="add-picture-btn" onClick={() => picturesAppend({ mealPicture: "" })} />
                    </div>
                </section>

                {/* ================ SECTION 2 ======================== */}
                <section className="ingrediant-view-list-section-2">
                    <h1>Ingrediants (Preview)</h1>
                    <ul>
                        {watch("ingredients").map((item, index) => {
                            return <li key={index}>{item.ingredient == "" ? "Add Ingrediant Name" : item.ingredient}</li>;
                        })}
                    </ul>
                </section>

                {/* ================ SECTION 3 ======================== */}
                <section className="ingrediant-over-view-section-3">
                    <h1>Images (Preview)</h1>
                    <div>
                        {" "}
                        <SingleImageInput source={{ mealPicture: watch("strMealThumb") }} width="100%" height="100%" errorPargId={"thumb-image"} />
                        <div className="meal-thumbs">
                            {watch("mealPictures").map((item, index) => {
                                return <SingleImageInput key={index} source={item} errorPargId={`p-error-${index}`} />;
                            })}
                        </div>
                    </div>
                    <div className="btns">
                        <button type="submit" className="update-meal-btn">
                            UPDATE
                        </button>
                        <button type="button" onClick={() => navigate("/")} className="cancle-btn">
                            CANCLE
                        </button>
                    </div>
                </section>
            </form>
        </>
    );
}
