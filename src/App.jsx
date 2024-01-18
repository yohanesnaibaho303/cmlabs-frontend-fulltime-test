import { Route, Routes } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent";
import HomePage from "./pages/HomePage";
import IngredientsPage from "./pages/IngredientsPage";
import MealsFilter from "./meals-filter/MealsFilter";
import DetailMeal from "./meals-detail/DetailMeal";
import CategoryList from "./category/CategoryList";

const App = () => {
  return (
    <div>
      <NavBarComponent />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />

        <Route path="/meals/:ingredients" element={<MealsFilter />} />
        <Route path="/meals/:ingredients/:meal" element={<DetailMeal />} />
        <Route path="/category/:categories" element={<CategoryList />} />
      </Routes>
    </div>
  );
};

export default App;
