import { Route, Routes } from "react-router-dom";

import NavBarComponent from "./components/NavBarComponent";
import HomePage from "./pages/HomePage";
import IngredientsPage from "./pages/IngredientsPage";

const App = () => {
  return (
    <div>
      <NavBarComponent />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Routes>
    </div>
  );
};

export default App;
