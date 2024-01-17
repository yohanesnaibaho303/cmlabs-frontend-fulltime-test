import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ReactPlayer from "react-player";

import "./DetailMeal.css";

function DetailMeal() {
  const navigate = useNavigate();
  let { meal, ingredients } = useParams();

  const [detailMeals, setDetailMeals] = useState();

  const instruction = detailMeals?.strInstructions?.split(".");
  const [recipe, setRecipe] = useState();
  const [Measure, setMeasure] = useState();

  useEffect(() => {
    axios
      .get("http://www.themealdb.com/api/json/v1/1/lookup.php", {
        params: {
          i: meal,
        },
      })
      .then((response) => {
        setDetailMeals(response.data.meals[0]);
        let ingredient = Object.keys(response.data.meals[0])
          .filter((key) => key.includes("strIngredient"))
          .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: response.data.meals[0][key],
            });
          }, {});
        let measure = Object.keys(response.data.meals[0])
          .filter((key) => key.includes("strMeasure"))
          .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: response.data.meals[0][key],
            });
          }, {});

        setRecipe(Object.values(ingredient));
        setMeasure(Object.values(measure));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [meal]);

  return (
    <div>
      {/* Header */}
      <div className="px-3 header">
        <div className="container d-flex flex-row mt-5 gap-2 breadcrumb pt-5">
          <span onClick={() => navigate("/")}>Home</span>
          <span>{" > "}</span>
          <span onClick={() => navigate("/meals/" + ingredients)}>
            {ingredients}
          </span>
          <span>{" > "}</span>
          <span className="fw-semibold">{detailMeals?.strMeal}</span>
        </div>

        <div className="container">
          <h3 className="text-center fw-bold mt-2 mb-4">
            {detailMeals?.strMeal}
          </h3>
        </div>
      </div>

      <div className="container mt-4 gap-5 detail-content">
        {/* Konten Kiri */}
        <div className="content-left">
          <span className="fw-bold text-warning mb-3">
            {detailMeals?.strArea} Culinary
          </span>
          <img src={detailMeals?.strMealThumb} alt={detailMeals?.strMeal} />
          <h4 className="mt-3">Tags :</h4>
          <div className="d-flex flex-row gap-2">
            {detailMeals?.strTags?.split(",").map((value) => (
              // eslint-disable-next-line react/jsx-key
              <div className="badge bg-warning text-wrap p-2">
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* konten Kanan */}
        <div className="d-flex flex-column mt-3 content-right">
          <div className="mt-2 Recipe">
            <h3>Recipe</h3>
            <ul>
              {recipe
                ?.filter((item) => item !== "" && item !== null)
                .map((item, index) => {
                  return (
                    <li>
                      {Measure[index]} {item}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="mt-2 instruction">
            <h3>Instructions</h3>
            <ul>
              {instruction
                ?.filter((item) => item !== "")
                .map((item) => {
                  return <li>{item}</li>;
                })}
            </ul>
          </div>
        </div>
      </div>

      {/* Yotube Video */}
      <div className="container d-flex flex-column align-items-center justify-content-center mt-3 mb-5">
        <h3>Toturials</h3>
        <ReactPlayer url={detailMeals?.strYoutube} playing={false} />
      </div>
    </div>
  );
}

export default DetailMeal;
