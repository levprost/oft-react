import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Menu from "../../../components/Menu";
import "../../../styles/CSS/editArticle.css"

const EditArticle = () => {
  const { article } = useParams(); // ID URL
  const navigate = useNavigate();

  const [titleArticle, setTitleArticle] = useState("");
  const [oldTitleArticle, setOldTitleArticle] = useState("");
  const [contentArticle, setContentArticle] = useState("");
  const [typeArticle, setTypeArticle] = useState("");
  const [content2Article, setContent2Article] = useState("");
  const [sectionArticle, setSectionArticle] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getArticle(); // Preloader ARTICLE
  }, [article]);


  // Fetch article data
  const getArticle = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/articles/${article}`
      );
      console.log("API:", res.data.article);

      setOldTitleArticle(res.data.article.title_article);
      setTitleArticle(res.data.article.title_article);
      setContentArticle(res.data.article.content_article);
      setTypeArticle(res.data.article.type_article);
      setContent2Article(res.data.article.content2_article);
      setSectionArticle(res.data.article.section_article);

      // Now fetch media related to this article
      getMediaFiles();
    } catch (error) {
      console.error("Ошибка при загрузке статьи:", error);
    }
  };

  // Fetch media files associated with the article
  const getMediaFiles = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/media/${article}/media`
      );
      console.log("Media Files:", res.data);

      // Assuming the response is an array of media files
      setMediaFiles(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке медиафайлов:", error);
    }
  };

  // Update article details
  const updateArticle = async (e) => {
    e.preventDefault();

    const data = {
      title_article: titleArticle,
      content_article: contentArticle,
      type_article: typeArticle,
      content2_article: content2Article,
      section_article: sectionArticle,
      _method: "PUT",
    };

    try {
      await axios.post(`http://127.0.0.1:8000/api/articles/${article}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/admin/article");
    } catch ({ response }) {
      if (response?.status === 422) {
        console.error("Ошибка валидации:", response.data.errors);
        setValidationError(response.data.errors);
      }
    }
  };

  // Handle delete media
  const handleDeleteMedia = async (mediaId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/media/${mediaId}`
      );
      setMediaFiles(mediaFiles.filter((media) => media.id !== mediaId)); // Remove deleted media
    } catch (error) {
      console.error("Ошибка при удалении медиафайла:", error);
    }
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
                            defaultValue={oldTitleArticle}
                            onChange={(event) =>
                              setTitleArticle(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId="ContentArticle">
                      <Form.Label>
                        {contentArticle
                          ? `Ancien contenu: ${contentArticle}`
                          : "Contenu d'article"}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={contentArticle}
                        onChange={(event) =>
                          setContentArticle(event.target.value)
                        }
                      />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Form.Group controlId="Content2Article">
                          <Form.Label>Deuxième contenu d'article</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={content2Article}
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
                            defaultValue={typeArticle}
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
                            defaultValue={sectionArticle}
                            onChange={(event) =>
                              setSectionArticle(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button variant="primary" className="mt-2" type="submit">
                      Enregistrer
                    </Button>
                  </Form>
                </div>
                <div className="media-grid">
                  {mediaFiles.length > 0 ? (
                    mediaFiles.map((media) => (
                      <div key={media.id} className="media-item">
                        <div className="media-container">
                          <img
                            src={`http://127.0.0.1:8000/storage/uploads/${media.media}`}
                            alt={`media-${media.id}`}
                            className="media-thumbnail"
                          />
                          <button
                            className="btn btn-danger delete-btn"
                            onClick={() => handleDeleteMedia(media.id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Pad de média pour cette article.</p>
                  )}
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
