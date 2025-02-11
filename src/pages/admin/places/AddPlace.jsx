import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/Menu";

const AddPlace = () => {
  const navigate = useNavigate();

  // Состояния для формы
  const [namePlace, setNamePlace] = useState("");
  const [addressPlace, setAddressPlace] = useState("");
  const [latitudePlace, setLatitudePlace] = useState("");
  const [longitudePlace, setLongitudePlace] = useState("");
  const [articleId, setArticleId] = useState(""); // Должно быть строкой
  const [articles, setArticles] = useState([]);

  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/articles");
      setArticles(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des articles", error);
    }
  };

  // Функция отправки данных
  const addPlace = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name_place", namePlace);
      formData.append("address_place", addressPlace);
      formData.append("latitude_place", latitudePlace);
      formData.append("longitude_place", longitudePlace);
      formData.append("article_id", articleId);

      await axios.post("http://127.0.0.1:8000/api/places", formData);
      
      navigate("/admin/places"); // Перенаправление после добавления
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Le lieu n'a pas été créé", error);
      }
    }
  };

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ajout d'un nouveau lieu</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="alert alert-danger">
                      <ul className="mb-0">
                        {Object.entries(validationError).map(([key, value]) => (
                          <li key={key}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Form onSubmit={addPlace}>
                    <Row>
                      <Col>
                        <Form.Group controlId="NamePlace">
                          <Form.Label>Nom du lieu</Form.Label>
                          <Form.Control
                            type="text"
                            value={namePlace}
                            onChange={(e) => setNamePlace(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="AddressPlace">
                          <Form.Label>Adresse</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressPlace}
                            onChange={(e) => setAddressPlace(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="LatitudePlace">
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control
                            type="number"
                            step="any"
                            value={latitudePlace}
                            onChange={(e) => setLatitudePlace(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="LongitudePlace">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                            type="number"
                            step="any"
                            value={longitudePlace}
                            onChange={(e) => setLongitudePlace(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="ArticleSelect">
                          <Form.Label>Article lié</Form.Label>
                          <Form.Select
                            aria-label="Sélectionner un article"
                            value={articleId}
                            onChange={(event) => setArticleId(event.target.value)}
                          >
                            <option value="">Sélectionner un article</option>
                            {articles.length > 0 ? (
                              articles.map((article) => (
                                <option key={article.id} value={article.id}>
                                  {article.title_article}
                                </option>
                              ))
                            ) : (
                              <option disabled>Aucun article disponible</option>
                            )}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" className="mt-2 w-100" size="lg" type="submit">
                      Ajouter
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPlace;
