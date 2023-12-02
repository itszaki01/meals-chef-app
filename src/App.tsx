//Styles Scss
import "./App.scss";

import AppRouters from "./router/AppRouters";
import MealsDataProvider from "./context/MealsDataContext";
import TotalsProvider from "./context/TotalsContext";
function App() {
    scrollTo(0, 0);
    return (
        <>
            <MealsDataProvider>
                <TotalsProvider>
                    <div className="app">
                        {/* Rotues */}
                        <AppRouters />
                    </div>
                </TotalsProvider>
            </MealsDataProvider>
        </>
    );
}

export default App;
