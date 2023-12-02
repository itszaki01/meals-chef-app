import { createContext, ReactNode } from "react";
import { MealsDataType } from "../types/MealsData.type";
import { useState, useEffect } from "react";
import { mealsData as _mealsData } from "../mealsData";

//Context
type MealsContextTypes = {
    mealsData: MealsDataType[];
    setMealsData: React.Dispatch<React.SetStateAction<MealsDataType[]>>;
    handleNewMeal(newMeal: MealsDataType): void;
    handleUpdateMeal(newMeal: MealsDataType): void;
    handleDeletMeal(mealId: string): void;
};

export const MealsDataContext = createContext<MealsContextTypes>({} as MealsContextTypes);

//Types && Porvider
type MealsDataProviderProps = {
    children: ReactNode;
};

export default function MealsDataProvider({ children }: MealsDataProviderProps) {
    // <==========[ MEALS-DATA & LOCALC STORAGE ]========== //
    const dataLocal: MealsDataType[] =
        localStorage.getItem("mealsData") == null
            ? localStorage.setItem("mealsData", JSON.stringify(_mealsData))
            : JSON.parse(localStorage.getItem("mealsData") || "");

    //Meals Data State
    const [mealsData, setMealsData] = useState<MealsDataType[]>(dataLocal);

    //Condition: Any Effect On Data-State  === Set Then On Locla Storage
    useEffect(() => {
        localStorage.setItem("mealsData", JSON.stringify(mealsData));
    }, [mealsData]);

    // ==========[ MEALS-DATA & LOCALC STORAGE ]==========/> //

    //handleAddNewMeal
    function handleNewMeal(newMeal: MealsDataType): void {
        setMealsData([newMeal, ...mealsData]);
    }

    //handUpdateMeal
    function handleUpdateMeal(updatedMeal: MealsDataType): void {
        const updatedMeals = mealsData.filter((meal) => meal.idMeal !== updatedMeal.idMeal);
        setMealsData([updatedMeal, ...updatedMeals]);
    }

    //handleDeletMeal
    function handleDeletMeal(mealId: string): void {
        const updatedMeals = mealsData.filter((meal) => meal.idMeal !== mealId);
        setMealsData(updatedMeals);
    }
    return (
        <>
            <MealsDataContext.Provider value={{ setMealsData, mealsData, handleNewMeal, handleUpdateMeal, handleDeletMeal }}>
                {children}
            </MealsDataContext.Provider>
        </>
    );
}

