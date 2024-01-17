import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router";

import "./MealsFilter.css";

function MealsFilter() {
  const navigate = useNavigate();
  let { ingredients } = useParams();

  const [Meals, setMeals] = useState();
  const [searchMeal, setSearchMeal] = useState("");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php", {
        params: {
          i: ingredients,
        },
      })
      .then((response) => {
        setMeals(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ingredients]);

  return (
    <div>
      <div className="px-3 header">
        {/* Header */}
        <div className="container d-flex flex-row mt-5 gap-2 breadcrumb pt-5">
          <span onClick={() => navigate("/")}>Home</span>
          <span>{" > "}</span>
          <span
            className="fw-semibold"
            onClick={() => navigate("/meals/" + ingredients)}
          >
            {ingredients}
          </span>
        </div>

        <div className="container">
          <h3 className="text-center fw-bold mt-2">
            Foods with {ingredients} Ingredients
          </h3>
          <p className="fs-5 text-center">
            There are <span className="fw-bold">{Meals?.length}</span> Meals
            with {ingredients} Ingredients
          </p>
        </div>

        {/* search meals by filter ingredients */}
        <div className="container mt-3 mb-5 position-relative search">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <Icon icon="material-symbols:search-rounded" width="35" />
            <input
              type="text"
              className="ms-3"
              placeholder="Search Meals"
              value={searchMeal}
              onChange={(e) => setSearchMeal(e.target.value)}
            />
            <Icon
              icon="ph:x-bold"
              width="20"
              className="delete-search"
              onClick={() => setSearchMeal("")}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container d-flex flex-row mt-5 gap-3 content">
        {Meals?.filter((v) =>
          v.strMeal.toLowerCase().includes(searchMeal.toLowerCase())
        ).map((item) => {
          return (
            <>
              <div
                className="card-meal-list"
                key={parseInt(item.idMeal)}
                onClick={() =>
                  navigate("/meals/" + ingredients + "/" + item.idMeal)
                }
              >
                <img src={item.strMealThumb} alt={item.idMeal} />
                <div className="overlay-img-list"></div>
                <span className="position-absolute top-50 start-50 translate-middle fw-bold fs-4 text-white text-center">
                  {item.strMeal}
                </span>
              </div>
            </>
          );
        })}

        {Meals?.filter((v) =>
          v.strMeal.toLowerCase().includes(searchMeal.toLowerCase())
        ).length === 0 && (
          <>
            <h4 className="fw-bold">no search results</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default MealsFilter;
