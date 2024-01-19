import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import "./MealsFilter.css";
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";

function MealsFilter() {
  const navigate = useNavigate();
  const { ingredients } = useParams();

  const [meals, setMeals] = useState([]);
  const [searchMeal, setSearchMeal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/filter.php",
          {
            params: {
              i: ingredients,
            },
          }
        );
        setMeals(response.data.meals || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [ingredients]);

  const handleSearchChange = (e) => {
    setSearchMeal(e.target.value);
  };

  const clearSearch = () => {
    setSearchMeal("");
  };

  const handleMealClick = (item) => {
    navigate(`/meals/${ingredients}/${item.idMeal}`);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchMeal.toLowerCase())
  );

  return (
    <div className="bg-content min-vh-100">
      <div className="header-02 w-100 pb-1 px-3">
        <div
          className="bread container d-flex flex-row gap-2 breadcrumb"
          style={{ paddingTop: "96px" }}
        >
          <span onClick={() => navigate(`/ingredients`)}>Ingredients</span>
          <span className="fw-bold">{" // "}</span>
          <span
            className="fw-semibold"
            onClick={() => navigate(`/meals/${ingredients}`)}
          >
            {ingredients}
          </span>
        </div>

        <div className="container">
          <h3 className="text-center fw-bold mt-2">
            Foods with {ingredients} Ingredients
          </h3>
          <p className="fs-5 text-center">
            There are <span className="fw-bold">{filteredMeals.length}</span>{" "}
            Meals with {ingredients} Ingredients
          </p>
        </div>

        <div className="container mt-3 mb-5 position-relative search">
          <SearchInput
            value={searchMeal}
            onChange={handleSearchChange}
            onClear={clearSearch}
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="container d-flex flex-row mt-5 gap-3 content pb-5">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((item) => (
              <div
                key={parseInt(item.idMeal)}
                className="card-meal-list"
                onClick={() => handleMealClick(item)}
              >
                <img src={item.strMealThumb} alt={item.idMeal} />
                <div className="overlay-img-list"></div>
                <span className="position-absolute top-50 start-50 translate-middle fw-bold fs-4 text-white text-center">
                  {item.strMeal}
                </span>
              </div>
            ))
          ) : (
            <h6 className="fw-bold text-danger">
              *No results found, please retype keywords correctly
            </h6>
          )}
        </div>
      )}
    </div>
  );
}

export default MealsFilter;
