import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Menu = () => {
  return (
    <Navbar expand="lg" className="navbar-custom" variant="dark">
      <Container>
        {/* Бургер-меню для мобильных */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Центр: ссылки */}
          <Nav className="mx-auto">
            <Nav.Link href="#home" className="text-white fw-bold">Accueil</Nav.Link>
            <Nav.Link href="#about" className="text-white fw-bold">Actualité</Nav.Link>
            <Nav.Link href="#services" className="text-white fw-bold">Guide de Saint André des Eaux</Nav.Link>
            <Nav.Link href="#contact" className="text-white fw-bold">Galerie</Nav.Link>
            <Nav.Link href="#contact" className="text-white fw-bold">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Справа: логотип */}
        <Navbar.Brand href="#home" className="ms-auto">
          <img
            src=""
            alt="Логотип"
            width="50"
            height="50"
            className="d-inline-block align-top rounded-circle"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Menu;