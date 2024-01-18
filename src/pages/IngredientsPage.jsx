import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./pages.css";
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";

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
    <div className="bg-light min-vh-100">
      <div className="header-02 w-100 pb-1 px-3">
        <div className="container">
          <h1 className="text-center fw-bold" style={{ paddingTop: "96px" }}>
            Discover List of Ingredients
          </h1>
          <p className="fs-4 text-center  ">
            There are <span className="fw-bold">{ingredients.length}</span>{" "}
            ingredients found
          </p>
          <p className="text-center text-secondary">
            Search for food or recipes based on keywords as you like.
          </p>
        </div>

        <div className="container mt-3 mb-5 position-relative search">
          <SearchInput
            value={searchIngredients}
            onChange={handleSearchChange}
            onClear={clearSearch}
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
            <h6 className="fw-bold text-danger">
              *No results found, please retype keywords correctly
            </h6>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientsPage;
