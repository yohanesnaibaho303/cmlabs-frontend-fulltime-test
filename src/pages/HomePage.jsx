import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Col, Container, Row } from "react-bootstrap";
import HeroImage from "../../public/assets/hero.png";

import "../pages/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories || []);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  }, []);

  return (
    <div className="homepage overflow-hidden">
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6">
              <h1 className="mb-4">
                Discover <br /> <span>The Greatest</span> <br />
                Recipes With Us!
              </h1>
              <p className="mb-4">
                Eating is one of life's great pleasures. Enjoying our favorite
                foods can be a real pleasure and something that makes life truly
                feel worthwhile.
              </p>

              <button className="btn btn-outline-dark btn-lg rounded-1 mb-xs-0 mb-2">
                Find Recipes
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img
                src={HeroImage}
                alt="hero-img"
                // className="animate__animated animate__fadeInUp"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="category w-100 min-vh-100 pt-6 ">
        <Row>
          <Col>
            <h1 className="text-center fw-bold">All Recipe Categories</h1>
            <p className="text-center">
              Eating is intimately associated with happiness.
            </p>
          </Col>
        </Row>

        <Row className="d-flex flex-row mt-5 gap-3 content">
          {categories.map((category) => {
            return (
              <div
                className="card-ingredients"
                key={category.idCategory}
                // onClick={() => navigate("/meals/" + item.strIngredient)}
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                />
                <div className="overlay-img"></div>
                <span
                  style={{ textShadow: "1px 1px 1px #fff" }}
                  className="position-absolute top-50 start-50 translate-middle fw-bold fs-4 text-black text-center"
                >
                  {category.strCategory}
                </span>
              </div>
            );
          })}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-5 mb-5">
            <button
              className="btn btn-success rounded-5 btn-lg"
              onClick={() => navigate("/ingredients")}
            >
              See All Recipes {" > "}
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
