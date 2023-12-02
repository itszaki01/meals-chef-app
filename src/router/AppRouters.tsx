import { BrowserRouter, Route, Routes } from "react-router-dom";
//Componenets
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/home/HomePage";
import MealDetailsPage from "../pages/meal-detials/MealDetailsPage";
import Error404Layout from "../layouts/Error404Layout";
import AddNewMealPage from "../pages/add-new/AddNewMealPage";
import UpdateMealPage from "../pages/update-meal/UpdateMealPage";

export default function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/meal-detials/:mealId/:mealName" element={<MealDetailsPage />} />
                    <Route path="/add-new" element={<AddNewMealPage />} />
                    <Route path="/update-meal/:mealId/:mealName" element={<UpdateMealPage />} />
                </Route>

                {/* ERROR PAGE 404 */}
                <Route path="*" element={<Error404Layout />} />
            </Routes>
        </BrowserRouter>
    );
}
