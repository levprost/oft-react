import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/Menu";

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
      <div className="container mt-5">
        <h1 className="mb-3">{article.title_article}</h1>

        {media && media.length > 0 ? (
          <img
            src={`http://127.0.0.1:8000/storage/uploads/${media[0].media}`}
            alt="Image d'article"
            className="img-fluid rounded mb-3"
          />
        ) : (
          <p>Aucune image disponible</p>
        )}

        <p className="text-muted">Type: {article.type_article}</p>
        <p className="fw-bold">Section: {article.section_article}</p>

        <div className="mt-4">
          <p>{article.content_article}</p>
          {article.content2_article && <p>{article.content2_article}</p>}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;