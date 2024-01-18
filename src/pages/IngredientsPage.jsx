import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Icon } from "@iconify/react";
import Loader from "../components/Loader";

import "./pages.css";

const IngredientsPage = () => {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php",
          {
            params: {
              i: "list",
            },
          }
        );
        setIngredients(response.data.meals || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleSearchChange = (e) => {
    setSearchIngredients(e.target.value);
  };

  const clearSearch = () => {
    setSearchIngredients("");
  };

  const handleIngredientClick = (ingredient) => {
    navigate(`/meals/${ingredient.strIngredient}`);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.strIngredient
      .toLowerCase()
      .includes(searchIngredients.toLowerCase())
  );

  return (
    <div>
      <header className="w-100 min-vh-100">
        <div className="container">
          <h1 className="text-center fw-bold mt-5 pt-5">
            Discover List of Ingredients
          </h1>
          <p className="fs-4 text-center  ">
            There are <span className="fw-bold">{ingredients.length}</span>{" "}
            ingredients found
          </p>
          <p className="text-center">
            Search for food or recipes based on keywords as you like.
          </p>
        </div>

        <div className="container mt-3 mb-5 position-relative search">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <Icon icon="material-symbols:search-rounded" width="35" />
            <input
              type="text"
              className="ms-3"
              placeholder="Search Ingredients"
              width={100}
              value={searchIngredients}
              onChange={handleSearchChange}
            />
            <Icon
              icon="ph:x-bold"
              width="20"
              className="delete-search"
              onClick={clearSearch}
            />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="container d-flex flex-row mt-5 gap-3 content pb-5">
            {filteredIngredients.map((item) => (
              <div
                className="card-ingredients-list"
                key={item.idIngredient}
                onClick={() => handleIngredientClick(item)}
              >
                <img
                  src={`https://themealdb.com/images/ingredients/${item.strIngredient}.png`}
                  alt={item.strIngredient}
                />
                <div className="overlay-img"></div>
                <span className="position-absolute top-50 start-50 translate-middle fw-bold fs-4 text-white text-center">
                  {item.strIngredient}
                </span>
              </div>
            ))}
            {filteredIngredients.length === 0 && (
              <h4 className="fw-bold">No search results</h4>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default IngredientsPage;
