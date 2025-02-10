import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMedia = () => {
  const navigate = useNavigate();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [articleId, setArticleId] = useState(null);
  const [validationError, setValidationError] = useState({});

  // Les formats
  const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml"];

  useEffect(() => {
    const fetchLastArticleId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/articles/last");
        if (response.data && response.data.id) {
          setArticleId(response.data.id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ID de l'article :", error);
      }
    };
    fetchLastArticleId();
  }, []);

  // 🔹 Filtres de tyeps(Les format inclus)
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filteredFiles = selectedFiles.filter((file) => allowedFormats.includes(file.type));

    if (filteredFiles.length < selectedFiles.length) {
      alert("Certains fichiers ont été ignorés car ils ne sont pas dans un format valide.");
    }

    const newFiles = filteredFiles.map((file) => ({
      file,
      type: "image", // Par defaut image
    }));
    setMediaFiles([...mediaFiles, ...newFiles]); //Spread operator - pour mettre tous dans MediaFiles
  };

  // 
  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFiles = Array.from(event.dataTransfer.files);
    const filteredFiles = selectedFiles.filter((file) => allowedFormats.includes(file.type));

    if (filteredFiles.length < selectedFiles.length) {
      alert("Certains fichiers ont été ignorés car ils ne sont pas dans un format valide.");
    }

    const newFiles = filteredFiles.map((file) => ({
      file,
      type: "image",
    }));
    setMediaFiles([...mediaFiles, ...newFiles]);
  };

  // 🔹 Удаление файла из списка
  const removeFile = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index)); //Spread operator - pour mettre tous dans MediaFiles
  };

  // 🔹 Изменение типа файла (image/video)
  const updateFileType = (index, newType) => {
    const updatedFiles = [...mediaFiles];
    updatedFiles[index].type = newType;
    setMediaFiles(updatedFiles);
  };

  // 🔹 Отправка формы
  const addMedia = async (e) => {
    e.preventDefault();
    if (mediaFiles.length === 0) {
      alert("Veuillez sélectionner au moins un fichier !");
      return;
    }

    const formData = new FormData();
    mediaFiles.forEach(({ file, type }) => {
      formData.append("media[]", file);
      formData.append("type_media[]", type);
    });
    formData.append("article_id", articleId);

    try {
      await axios.post("http://127.0.0.1:8000/api/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Ajouter des médias</h4>
              <hr />
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
                {/* Drag & Drop область */}
                <div
                  className="drop-zone border p-4 text-center"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <p>Déposez vos fichiers ici ou cliquez pour sélectionner</p>
                  <Form.Control type="file" multiple accept=".jpg,.jpeg,.png,.gif,.svg" onChange={handleFileChange} />
                </div>

                {/* Список загруженных файлов */}
                {mediaFiles.length > 0 && (
                  <div className="mt-3">
                    <h5>Fichiers sélectionnés :</h5>
                    {mediaFiles.map((media, index) => (
                      <Row key={index} className="align-items-center mb-2">
                        <Col md={6}>
                          <span>{media.file.name}</span>
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            as="select"
                            value={media.type}
                            onChange={(e) => updateFileType(index, e.target.value)}
                          >
                            <option value="image">Image</option>
                            <option value="video">Vidéo</option>
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button variant="danger" size="sm" onClick={() => removeFile(index)}>
                            Supprimer
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </div>
                )}

                <Button variant="primary" className="mt-3 w-100" size="lg" type="submit">
                  Ajouter Média
                </Button>
              </Form>
              {articleId && <p className="mt-3">Article ID utilisé : {articleId}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedia;
