import { useContext } from "react";
import { MealsDataContext } from "../context/MealsDataContext";

//Custom Hook For MealsData
export const useMealstData = () => useContext(MealsDataContext);
