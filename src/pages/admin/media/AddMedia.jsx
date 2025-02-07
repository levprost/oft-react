import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddMedia = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [typeMedia, setTypeMedia] = useState("");
  const [articleId, setArticleId] = useState([]);
  const [validationError, setValidationError] = useState({});

  // 🔹 Получаем последний article_id при загрузке компонента
  useEffect(() => {
    const fetchLastArticleId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/articles");
        if (response.data && response.data.id) {
          setArticleId(response.data.id); // Устанавливаем articleId автоматически
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ID de l'article :", error);
      }
    };

    fetchLastArticleId();
  }, []);
  // Функция обработки загрузки файла
  const changeHandler = (event) => {
    setMedia(event.target.files[0]);
  };

  // 🔹 Отправляем форму с последним `articleId`
  const addMedia = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("media", media);
    formData.append("type_media", typeMedia);
    formData.append("article_id", articleId); // Добавляем articleId в данные формы
    console.log("media:", media);
    console.log("type_media:", typeMedia);
    console.log("article_id:", articleId);
    try {
      await axios.post("http://127.0.0.1:8000/api/media", formData);
      navigate("/admin/media");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Erreur lors de l'ajout du média :", error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Ajouter des médias</h4>
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
                  <Form onSubmit={addMedia}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Média</Form.Label>
                          <Form.Control type="file" onChange={changeHandler} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Type d'article</Form.Label>
                          <Form.Control
                            as="select"
                            value={typeMedia}
                            onChange={(event) => setTypeMedia(event.target.value)}
                          >
                            <option value="">Sélectionner un type de média</option>
                            <option value="video">Vidéo</option>
                            <option value="image">Image/photo</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" className="mt-2 w-100" size="lg" type="submit">
                      Ajouter Média
                    </Button>
                  </Form>
                  {articleId && <p className="mt-3">Article ID utilisé : {articleId}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMedia;
