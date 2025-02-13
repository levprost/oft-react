import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import LogoutButton from "./Auth/LogoutButton";


const Menu = () => {
  return (
    <Navbar expand="lg" className="navbar-custom" variant="dark">
      <Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mx-auto">
            <Nav.Link href="/home" className="text-white fw-bold">Accueil |</Nav.Link>
            <Nav.Link href="#about" className="text-white fw-bold">Actualité |</Nav.Link>
            <Nav.Link href="#services" className="text-white fw-bold">Guide de Saint André des Eaux |</Nav.Link>
            <Nav.Link href="#contact" className="text-white fw-bold">Galerie |</Nav.Link>
            <Nav.Link href="#contact" className="text-white fw-bold">Contact</Nav.Link>
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>


        <Nav href="/home" className="">
          <img
            src="/images/logo-saint-andre-des-eaux.png"
            alt="Logo"
            width="100"
            height="50"
            className="d-inline-block align-top"
          />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;