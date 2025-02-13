import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AiOutlineFileText, AiOutlineCamera, AiOutlineEnvironment } from "react-icons/ai";
import Menu from "../../components/Menu"; 

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Constante pour la clé du token
    const ACCESS_TOKEN_KEY = "access_token";
  
    // Vérifiez s'il y a un token (sinon, redirigez vers la page de connexion)
    useEffect(() => {
      checkAuth(); // Lancez la vérification lors du chargement du composant
    }, []);
  
    // Vérification de l'autorisation via le token
    const checkAuth = () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY); // Obtenez le token depuis localStorage
      console.log("Token: ", token); // Journalisez le token pour le débogage
  
      if (token) {
        setIsAuthenticated(true); // Si le token existe, autorisez l'utilisateur
      } else {
        setIsAuthenticated(false); // Si pas de token, l'utilisateur n'est pas autorisé
        navigate("/login/scrt1337"); // Redirigez vers la page de connexion
      }
    };
  
  return (
    <>
    <Menu />
    <Container className="mt-4">
      <h2 className="text-center mb-4">📌 Tableau de bord de l'administrateur</h2>
      <Row className="g-4">
        {/* Articles */}
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title><AiOutlineFileText /> Gestion des articles</Card.Title>
              <Link to="/admin/article" className="btn btn-primary me-2">Tous les articles</Link>
              <Link to="/admin/article/add" className="btn btn-success">Ajouter</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Médias */}
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title><AiOutlineCamera /> Gestion des médias</Card.Title>
              <Link to="/admin/media" className="btn btn-primary me-2">Tous les médias</Link>
              <Link to="/admin/media/add" className="btn btn-success">Ajouter</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Lieux */}
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title><AiOutlineEnvironment /> Gestion des lieux</Card.Title>
              <Link to="/admin/place" className="btn btn-primary me-2">Tous les lieux</Link>
              <Link to="/admin/place/add" className="btn btn-success">Ajouter</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AdminDashboard;
