import React from 'react'; 
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard'

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


//2. User Interface

// 1.1 Home Page

import HomePage from "./pages/ui/HomePage";

//2.2

import ArticlePage from "./pages/ui/ArticlePage";

const token = localStorage.getItem("access_token");


function App() {
  return ( 
    <BrowserRouter> 
    <Routes> 
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={<HomePage />} />

    <Route path="/admin/article" element={token ? <Articles /> : <HomePage/>} />
    <Route path="/admin/article/add" element={token ? <AddArticle /> : <HomePage/>} />
    <Route path="/admin/article/edit/:article" element={token ? <EditArticle /> : <HomePage/>} />
    <Route path="/article/:id" element={<ArticlePage />} />

    <Route path="/admin/media" element={token ? <Media /> : <HomePage/>} />
    <Route path="/admin/media/add" element={token ? <AddMedia /> : <HomePage/>} />
    <Route path="/admin/media/edit/:media" element={token ? <EditMedia /> : <HomePage/>} />

    <Route path="/admin/place" element={<Places />} />
    <Route path="/admin/place/add" element={token ? <AddPlace /> : <HomePage/>}></Route>
    <Route path="/admin/place/edit/:place" element={token ?<EditPlace /> : <HomePage/>} />

    <Route path="/login/scrt1337" element={<Login />} />
    <Route path="/scrt1337/dash" element={token ? <AdminDashboard /> : <HomePage />} />
    

    </Routes> 
</BrowserRouter> 
  ); 
}

export default App;
