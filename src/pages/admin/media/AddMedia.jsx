import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/Menu";

const AddMedia = () => {
  const navigate = useNavigate();

  const [media, setMedia] = useState("");
  const [typeMedia, setTypeMedia] = useState("");
  const [articleId, setArticlesId] = useState([]);
  const [article, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const [validationError, setValidationError] = useState({});

  const changeHandler = (event) => {
    setMedia(event.target.files[0]);
  };
  useEffect(() => {
    getArticles();
  }, []);
  const getArticles = async () => {
    await axios.get("http://127.0.0.1:8000/api/articles").then((res) => {
      setArticles(res.data);
      setIsLoading(false);
    });
  };

  const addMedia = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("media", media);
    formData.append("type_media", typeMedia);
    formData.append("article_id", articleId);
    await axios
      .post(`http://127.0.0.1:8000/api/media`, formData)
      .then(navigate("/admin/media"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  if(isLoading){
    return(
      <div>
        <h1>
          Chargement des articles...
        </h1>
      </div>
    )
  }else{
  return (
    <>
      <Menu />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ajouter des média</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={addMedia}>
                    <Row>
                      <Col>
                        <Form.Group controlId="media" className="mb-3">
                          <Form.Label>Média</Form.Label>
                          <Form.Control type="file" onChange={changeHandler} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="TypeMedia">
                          <Form.Label>Type d'article</Form.Label>
                          <Form.Control
                            as="select"
                            value={typeMedia}
                            onChange={(event) =>
                              setTypeMedia(event.target.value)
                            }
                          >
                            <option value="">
                              Sélectionner un type de média
                            </option>
                            <option value="video">Vidéo</option>
                            <option value="image">Image/photo</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="position">
                        <Form.Label>Article</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => setArticlesId(event.target.value)}
                          >
                            <option>Choisissez un type de bac</option>
                              {article.map((article) => (
                                <option key={article.id} value={article.id}>
                                  {article.title_article}
                                </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block
                      type="submit"
                    >
                      Créer
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
};


export default AddMedia;
