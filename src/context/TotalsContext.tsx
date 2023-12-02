import { createContext, useState, ReactNode } from "react";

type TotalsProviderContextTypes = {
    totalOrders: number;
    setTotalOrders: React.Dispatch<React.SetStateAction<number>>;
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};
export const TotalsProviderContext = createContext<TotalsProviderContextTypes>({} as TotalsProviderContextTypes);

// TotalsProvider Props
type TotalsProviderProps = {
    children: ReactNode;
};
export default function TotalsProvider({ children }: TotalsProviderProps) {
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    return (
        <TotalsProviderContext.Provider value={{ totalOrders, totalPrice, setTotalOrders, setTotalPrice }}>{children}</TotalsProviderContext.Provider>
    );
}
