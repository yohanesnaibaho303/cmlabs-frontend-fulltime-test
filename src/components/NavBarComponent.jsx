import { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBarComponent = () => {
  const [changeColor, setChangecolor] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangecolor(true);
    } else {
      setChangecolor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();

    window.addEventListener("scroll", changeBackgroundColor);
  });

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={changeColor ? "color-active" : ""}
    >
      <Container className="animate animated animate__backInDown">
        <Navbar.Brand className="fw-3 fw-bold" href="/">
          Finest Meal App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="fw-bold">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ingredients">Ingredients</Nav.Link>
            <Nav.Link>Foods</Nav.Link>
            <Nav.Link>Local Culinary</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
