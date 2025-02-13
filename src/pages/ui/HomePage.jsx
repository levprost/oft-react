import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "../../components/Menu";
import Places from "../admin/places/Places";

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/home")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des articles", error);
      });
  }, []);

  return (
    <>
      <Menu />
      <div
        className=""
        style={{
          backgroundImage: "url('/images/font-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <h2 className="text-center mb-4">
          Dernières actualités de Saint-André-des-Eaux
        </h2>
        <Container>
          <Row>
            {articles.map((article) => (
              <Col key={article.article.id} md={4} sm={6} xs={12} className="mb-4">
                <Card className="shadow-sm">
                  {article.media && article.media.length > 0 && (
                    <Card.Img
                      variant="top"
                      src={`http://127.0.0.1:8000/storage/uploads/${article.media[0].media}`} 
                      alt={article.title_article}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{article.title_article}</Card.Title>
                    <Card.Text>
                      {article.article.content_article.substring(0, 100)}...
                    </Card.Text>
                    <Link to={`/article/${article.article.id}`}>
                      <Button variant="primary">Lire plus</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Places />
          </Row>
        </Container>
      </div>

    </>
  );
};

export default HomePage;
