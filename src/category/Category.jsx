/* eslint-disable react/prop-types */
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Category = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.strCategory}`);
  };

  return (
    <div>
      <Row className="content d-flex flex-row mt-5 gap-3">
        {categories.map((category) => (
          <div
            className="card-ingredients"
            key={category.idCategory}
            onClick={() => handleCategoryClick(category)}
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <div className="overlay-img"></div>
            <span
              style={{ textShadow: "1px 1px 1px #fff" }}
              className="position-absolute top-50 start-50 translate-middle fw-bold fs-4 text-black text-center"
            >
              {category.strCategory}
            </span>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Category;
