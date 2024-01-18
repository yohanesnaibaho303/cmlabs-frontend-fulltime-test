import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="success" />
    </div>
  );
};

export default Loader;
