import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../../components/Menu";

const EditArticle = () => {
  const { article } = useParams(); // ID URL
  const navigate = useNavigate();

  const [titleArticle, setTitleArticle] = useState("");
  const [contentArticle, setContentArticle] = useState("");
  const [typeArticle, setTypeArticle] = useState("");
  const [content2Article, setContent2Article] = useState("");
  const [sectionArticle, setSectionArticle] = useState("");

  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getArticle(); // preloader ARTICLE
  }, [article]);

  const getArticle = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/articles/${article}`)
      .then((res) => {
        setTitleArticle(res.data.title_article);
        setContentArticle(res.data.content_article);
        setTypeArticle(res.data.type_article);
        setContent2Article(res.data.content2_article);
        setSectionArticle(res.data.section_article);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateArticle = async (e) => {
    e.preventDefault();

    const data = {
        title_article: titleArticle,
        content_article: contentArticle,
        type_article: typeArticle,
        content2_article: content2Article,
        section_article: sectionArticle,
        _method: "PUT", // Laravel besoin _method pour PUT/PATCH
    };

    await axios
        .post(`http://127.0.0.1:8000/api/articles/${article}`, data, {
            headers: { "Content-Type": "application/json" },
        })
        .then(() => navigate("/admin/article"))
        .catch(({ response }) => {
            if (response?.status === 422) {
                console.error("Ошибка валидации:", response.data.errors);
                setValidationError(response.data.errors);
            }
        });
};


  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un article</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="alert alert-danger">
                      <ul>
                        {Object.entries(validationError).map(([key, value]) => (
                          <li key={key}>{value}</li>
                        ))}
                      </ul>
                </div>
                  )}
                  <Form onSubmit={updateArticle}>
                    <Row>
                      <Col>
                        <Form.Group controlId="TitleArticle">
                          <Form.Label>Titre d'article</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleArticle}
                            onChange={(event) =>
                              setTitleArticle(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="ContentArticle">
                          <Form.Label>Contenu d'article</Form.Label>
                          <Form.Control
                            type="text"
                            value={contentArticle}
                            onChange={(event) =>
                              setContentArticle(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="Content2Article">
                          <Form.Label>Deuxième contenu d'article</Form.Label>
                          <Form.Control
                            type="text"
                            value={content2Article}
                            onChange={(event) =>
                              setContent2Article(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="TypeArticle">
                          <Form.Label>Type d'article</Form.Label>
                          <Form.Control
                            as="select"
                            value={typeArticle}
                            onChange={(event) =>
                              setTypeArticle(event.target.value)
                            }
                          >
                            <option value="">Sélectionner un type</option>
                            <option value="Histoire">Histoire</option>
                            <option value="Culture">Culture</option>
                            <option value="Nature">Nature</option>
                            <option value="Sport">Sport</option>
                            <option value="Evénements">Evénements</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                          <Form.Group controlId="SectionArticle">
                            <Form.Label>Section d'article</Form.Label>
                            <Form.Control
                              type="text"
                              value={sectionArticle}
                              onChange={(event) => setSectionArticle(event.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    <Button variant="primary" className="mt-2" type="submit">
                      Enregistrer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
