import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ReactPlayer from "react-player";
import "./DetailMeal.css";

function DetailMeal() {
  const navigate = useNavigate();
  const { meal, ingredients } = useParams();

  const [detailMeals, setDetailMeals] = useState(null);
  const [recipe, setRecipe] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [instruction, setInstruction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/lookup.php",
          { params: { i: meal } }
        );

        const mealData = response.data.meals[0];
        setDetailMeals(mealData);

        const ingredientKeys = getKeysBySubstring(mealData, "strIngredient");
        const measureKeys = getKeysBySubstring(mealData, "strMeasure");

        setRecipe(getValuesByKey(mealData, ingredientKeys));
        setMeasure(getValuesByKey(mealData, measureKeys));
        setInstruction(mealData?.strInstructions?.split(".") || []);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchData();
  }, [meal]);

  const getKeysBySubstring = (obj, substring) =>
    Object.keys(obj).filter((key) => key.includes(substring));

  const getValuesByKey = (obj, keys) =>
    keys.map((key) => obj[key]).filter(Boolean);

  return (
    <div>
      <div className="px-3 header">
        <div className="bread container d-flex flex-row mt-5 gap-2 breadcrumb pt-5">
          <span onClick={() => navigate(`/ingredients`)}>Ingredients</span>
          <span>{" > "}</span>
          <span onClick={() => navigate(`/meals/${ingredients}`)}>
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
        <div className="content-left">
          <span className="fw-bold text-warning mb-3">
            {detailMeals?.strArea} Culinary
          </span>
          <img src={detailMeals?.strMealThumb} alt={detailMeals?.strMeal} />
          <h4 className="mt-3">Tags :</h4>
          <div className="d-flex flex-row gap-2">
            {detailMeals?.strTags?.split(",").map((value, index) => (
              <div key={index} className="badge bg-warning text-wrap p-2">
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column mt-3 content-right">
          <div className="mt-2 Recipe">
            <h3>Recipe</h3>
            <ul>
              {recipe.map((item, index) => (
                <li key={index}>
                  {measure[index]} {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2 instruction">
            <h3>Instructions</h3>
            <ul>
              {instruction.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-column align-items-center justify-content-center mt-3 mb-5">
        <h3>Tutorials</h3>
        <ReactPlayer url={detailMeals?.strYoutube} playing={false} />
      </div>
    </div>
  );
}

export default DetailMeal;
