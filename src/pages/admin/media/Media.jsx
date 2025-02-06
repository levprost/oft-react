import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../../components/Menu";
import axios from "axios";

const Media = () => {
  const [media, setMedia] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    displayMedia();
    fetchArticles();
  }, []); // Sans les crochets ça tourne en boucle

  const displayMedia = async () => {
    await axios.get("http://127.0.0.1:8000/api/media").then((res) => {
      setMedia(res.data);
    });
  };
  const fetchArticles = async () => {
    await axios.get("http://127.0.0.1:8000/api/articles").then((res) => {
      setArticles(res.data);
    });
  };
  const deleteMedia = (id) => {
    axios.delete(`http:/127.0.0.1:8000/api/media/${id}`).then(displayMedia);
  };
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type de Média</th>
              <th>Média</th>
              <th>ID d'article</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {media.map((media) => (
              <tr key={media.id}>
                <td>{media.type_media}</td>
                <td>
                    <img
                      src={`http://127.0.0.1:8000/storage/uploads/${media.media}`}
                      width="75px" alt = "pas d'images"
                    />
                </td>
                <td>{media.article.title_article}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteMedia(media.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Media;
