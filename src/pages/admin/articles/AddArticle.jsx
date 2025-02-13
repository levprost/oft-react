import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/Menu";
import AddMedia from "../media/AddMedia";

const AddArticle = () => {
  const navigate = useNavigate();

  const [titleArticle, setTitleArticle] = useState("");
  const [contentArticle, setContentArticle] = useState("");
  const [typeArticle, setTypeArticle] = useState("");
  const [content2Article, setContent2Article] = useState("");
  const [sectionArticle, setSectionArticle] = useState("");
  const [articleId, setArticleId] = useState(null); 
  const [step, setStep] = useState(1); 

  const [validationError, setValidationError] = useState({});

  const addArticle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title_article", titleArticle);
      formData.append("content_article", contentArticle);
      formData.append("type_article", typeArticle);
      formData.append("content2_article", content2Article);
      formData.append("section_article", sectionArticle);

      const res = await axios.post(`http://127.0.0.1:8000/api/articles`, formData);

      if (res.data && res.data.id) {
        setArticleId(res.data.id); 
        setStep(2); 
      } else {
        console.error("ID de l'article non reçu !");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("L'article n'a été pas créé", error);
      }
    }
  };

  return (
    <>
      <Menu />
      <div className="container">
        {step === 1 ? (
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Création d'un nouvel article</h4>
                  <hr />
                  <div className="form-wrapper">
                    {Object.keys(validationError).length > 0 && (
                      <div className="row">
                        <div className="col-12">
                          <div className="alert alert-danger">
                            <ul className="mb-0">
                              {Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    <Form onSubmit={addArticle}>
                      <Row>
                        <Col>
                          <Form.Group controlId="Name">
                            <Form.Label>Titre d'article</Form.Label>
                            <Form.Control
                              type="text"
                              value={titleArticle}
                              onChange={(event) => setTitleArticle(event.target.value)}
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
                              onChange={(event) => setContentArticle(event.target.value)}
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
                              onChange={(event) => setContent2Article(event.target.value)}
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
                              onChange={(event) => setTypeArticle(event.target.value)}
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
                      <Button variant="primary" className="mt-2 w-100" size="lg" type="submit">
                        Créer
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <AddMedia articleId={articleId} />
        )}
      </div>
    </>
  );
};

export default AddArticle;
