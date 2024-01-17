import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./pages.css";
import { Row } from "react-bootstrap";
import { Icon } from "@iconify/react";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState();
  const [searchIngredients, setSearchIngredients] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://www.themealdb.com/api/json/v1/1/list.php", {
        params: {
          i: "list",
        },
      })
      .then((response) => {
        setIngredients(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <header className="w-100 min-vh-100">
        <div className="container">
          <h1 className="text-center fw-bold mt-5 pt-5">
            Discover List of Ingredients
          </h1>
          <p className="fs-4 text-center  ">
            There are <span className="fw-bold">{ingredients?.length}</span>{" "}
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
              onChange={(e) => setSearchIngredients(e.target.value)}
            />
            <Icon
              icon="ph:x-bold"
              width="20"
              className="delete-search"
              onClick={() => setSearchIngredients("")}
            />
          </div>
        </div>
        <div className="container d-flex flex-row mt-5 gap-3 content">
          {ingredients
            ?.filter((v) =>
              v.strIngredient
                .toLowerCase()
                .includes(searchIngredients.toLowerCase())
            )
            .map((item) => {
              return (
                <>
                  <div
                    className="card-ingredients"
                    key={item.idIngredient}
                    onClick={() => navigate("/meals/" + item.strIngredient)}
                  >
                    <img
                      src={
                        "https://themealdb.com/images/ingredients/" +
                        item.strIngredient +
                        ".png"
                      }
                      alt={item.strIngredient}
                    />
                    <div className="overlay-img"></div>
                    <span className="position-absolute top-50 start-50 translate-middle fw-bold fs-4 text-white text-center">
                      {item.strIngredient}
                    </span>
                  </div>
                </>
              );
            })}
          {ingredients?.filter((v) =>
            v.strIngredient
              .toLowerCase()
              .includes(searchIngredients.toLowerCase())
          ).length === 0 && (
            <>
              <h4 className="fw-bold">no search results</h4>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default IngredientsPage;
