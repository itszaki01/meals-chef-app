import { useContext } from "react";
import { TotalsProviderContext } from "../context/TotalsContext";

//Custom Hook
export const useTotals = () => useContext(TotalsProviderContext);
