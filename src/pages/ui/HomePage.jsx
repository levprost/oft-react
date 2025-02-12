import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "../../components/Menu";

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/home")
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des articles", error);
      });
  }, []);

  return (
    <>
          <Menu />
      <Container className="mt-4">
      <h2 className="text-center mb-4">Dernières actualités de Saint-André-des-Eaux</h2>
      <Row>
        {articles.map(article => (
          <Col key={article.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow-sm">
              {article.media && article.media.length > 0 && (
                <Card.Img variant="top" src={article.media[0].url} alt={article.title_article} />
              )}
              <Card.Body>
                <Card.Title>{article.title_article}</Card.Title>
                <Card.Text>{article.content_article.substring(0, 100)}...</Card.Text>
                <Link to={`/article/${article.id}`}>
                  <Button variant="primary">Lire plus</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default HomePage;
