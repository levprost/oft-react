import React from 'react'; 
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// 1.Admin

// 1.1 Articles
import Articles from "./pages/admin/articles/Articles";
import AddArticle from './pages/admin/articles/AddArticle';
import EditArticle from './pages/admin/articles/EditArticle';

// 1.2 Media
import Media from './pages/admin/media/Media';
import AddMedia from './pages/admin/media/AddMedia';
import EditMedia from './pages/admin/media/EditMedia';

// 1.3 Places
import Places from './pages/admin/places/Places';
import AddPlace from './pages/admin/places/AddPlace';
import EditPlace from './pages/admin/places/EditPlace';


function App() {
  return ( 
    <BrowserRouter> 
    <Routes> 
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Home />} />

    <Route path="/admin/article" element={<Articles />} />
    <Route path="/admin/article/add" element={<AddArticle />} />
    <Route path="/admin/article/edit/:article" element={<EditArticle />} /> 

    <Route path="/admin/media" element={<Media />} />
    <Route path="/admin/media/add" element={<AddMedia />} />
    <Route path="/admin/media/edit/:media" element={<EditMedia />} />

    <Route path="/admin/places" element={<Places />} />
    <Route path="/admin/place/add" element={<AddPlace />} />
    <Route path="/admin/place/edit/:place" element={<EditPlace />} />


    </Routes> 
</BrowserRouter> 
  ); 
}

export default App;
