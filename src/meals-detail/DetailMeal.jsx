import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import "./DetailMeal.css";
import ReactPlayer from "react-player";
import { Accordion } from "react-bootstrap";
import Loader from "../components/Loader";

function DetailMeal() {
  const navigate = useNavigate();
  const { meal, ingredients } = useParams();

  const [detailMeals, setDetailMeals] = useState(null);
  const [recipe, setRecipe] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [meal]);

  const getKeysBySubstring = (obj, substring) =>
    Object.keys(obj).filter((key) => key.includes(substring));

  const getValuesByKey = (obj, keys) =>
    keys.map((key) => obj[key]).filter(Boolean);

  return (
    <div className="bg-content min-vh-100">
      <div className="header-02 w-100 pb-1 px-3">
        <div
          className="bread container d-flex flex-row gap-2 breadcrumb "
          style={{ paddingTop: "96px" }}
        >
          <span onClick={() => navigate(`/ingredients`)}> Ingredients</span>
          <span className="fw-bold">{" // "}</span>
          <span onClick={() => navigate(`/meals/${ingredients}`)}>
            {ingredients}
          </span>
          <span className="fw-bold">{" // "}</span>
          <span className="fw-semibold" style={{ textTransform: "capitalize" }}>
            {detailMeals?.strMeal}
          </span>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="container">
            <h3
              className="text-center text-success fw-bold mt-2 mb-4"
              style={{ textTransform: "capitalize" }}
            >
              {detailMeals?.strMeal}
            </h3>
          </div>
        )}
      </div>

      <div className="container mt-4 gap-5 detail-content">
        <div className="content-left">
          <span className="fw-bold text-success mb-3">
            {detailMeals?.strArea} Culinary
          </span>
          <img src={detailMeals?.strMealThumb} alt={detailMeals?.strMeal} />
          <h5 className="mt-3">Tags :</h5>
          <div className="d-flex flex-row gap-2">
            {detailMeals?.strTags?.split(",").map((value, index) => (
              <div key={index} className="badge bg-success text-wrap p-2">
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column mt-3 content-right">
          <div className="pt-4">
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3>Recipe</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    {recipe.map((item, index) => (
                      <li key={index}>
                        {measure[index]} {item}
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <h3>Instruction</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="mt-2 instruction">
                    <ol type="1">
                      {instruction.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-column align-items-center justify-content-center mt-3 pb-5">
        <h3>Tutorials</h3>
        <ReactPlayer url={detailMeals?.strYoutube} playing={false} />
      </div>
    </div>
  );
}

export default DetailMeal;
