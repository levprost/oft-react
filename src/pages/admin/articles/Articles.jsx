import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../../components/Menu";
import axios from "axios";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    displayArticles();
  }, []); // Sans les crochets ça tourne en boucle

  const displayArticles = async () => {
    await axios.get("http://127.0.0.1:8000/api/articles").then((res) => {
      setArticles(res.data);
    });
  };
  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title d'arcticle</th>
              <th>Contenu d'artcile</th>
              <th>Type d'article</th>
              <th>Contenu d'article</th>
              <th>Section d'article</th>

            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title_article}</td>
                <td>{article.content_article}</td>
                <td>{article.type_article}</td>
                <td>{article.content2_article}</td>
                <td>{article.section_article}</td>
                <td>
                  <Link
                    to={`/articles/edit/${article.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Articles;
