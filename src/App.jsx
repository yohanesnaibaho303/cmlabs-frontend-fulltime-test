import { Route, Routes } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent";
import HomePage from "./pages/HomePage";
import IngredientsPage from "./pages/IngredientsPage";
import MealsFilter from "./meals-filter/MealsFilter";
import DetailMeal from "./meals-detail/DetailMeal";

const App = () => {
  return (
    <div>
      <NavBarComponent />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />

        <Route path="/meals/:ingredients" element={<MealsFilter />} />
        <Route path="/meals/:ingredients/:meal" element={<DetailMeal />} />
      </Routes>
    </div>
  );
};

export default App;
