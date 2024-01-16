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
      <Container>
        <Navbar.Brand className="fw-3 fw-bold" href="#home">
          Finest Meal App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="fw-bold">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Ingredients</Nav.Link>
            <Nav.Link href="#foods">Foods</Nav.Link>
            <Nav.Link href="#local">Local Culinary</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
