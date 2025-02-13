import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/Menu";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../../components/Footer";

// Icône personnalisée pour le marqueur sur la carte
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

const ArticlePage = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const displayArticles = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`);
        console.log("Données reçues:", res.data);
        setArticleData(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    displayArticles();
  }, [id]);

  if (!articleData) return <p className="text-center mt-4">Chargement...</p>;

  const { article, media } = articleData;

  return (
    <div>
      <Menu />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h1 className="mb-3 text-center">{article.title_article}</h1>

                {/* Section de l'image */}
                {media && media.length > 0 ? (
                  <div className="text-center">
                    <img
                      src={`http://127.0.0.1:8000/storage/uploads/${media[0].media}`}
                      alt="Image de l'article"
                      className="img-fluid rounded shadow-lg"
                      style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <p className="text-center text-muted">Aucune image disponible</p>
                )}

                {/* Informations supplémentaires */}
                <p className="text-muted mt-3">📌 Type : {article.type_article}</p>
                <p className="fw-bold">📖 Section : {article.section_article}</p>

                {/* Contenu de l'article */}
                <div className="mt-4">
                  <p>{article.content_article}</p>
                  {article.content2_article && <p>{article.content2_article}</p>}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Carte - affichée uniquement si l'article a des coordonnées */}
        {article.latitude_article && article.longitude_article && (
          <Row className="mt-4">
            <Col lg={8} className="mx-auto">
              <Card className="shadow-lg border-0">
                <Card.Body>
                  <h5 className="text-center mb-3">📍 Localisation</h5>
                  <MapContainer
                    center={[article.latitude_article, article.longitude_article]}
                    zoom={15}
                    style={{ height: "400px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[article.latitude_article, article.longitude_article]}
                      icon={customIcon}
                    >
                      <Popup>
                        <strong>{article.title_article}</strong> <br />
                        📍 {article.section_article}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default ArticlePage;
