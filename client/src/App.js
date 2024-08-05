import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import http from "./services/httpService";
import { api } from "./config.js";
import Dashboard from "./components/dashboard";
import Jumbotron from "./components/common/jumbotron";
import NotFound from "./components/not-found";
import NewPost from "./components/createPost.jsx";
import Log from "./components/log";
import Logout from "./components/logout";
import Register from "./components/register";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/common/protectedRoute";
import PostPage from "./components/PostPage";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const jwt = localStorage.getItem("token");
        const user_jwt = jwtDecode(jwt);
        const user = await http.get(`${api.usersEndPoint}${user_jwt._id}`);
        setUser(user.data);
      } catch (ex) {
        // Handle error
      }
    }
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Routes>
        <Route path="/users/login" element={<Log />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/logout" element={<Logout />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/users/login" />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/new-post" element={<ProtectedRoute><NewPost user={user} /></ProtectedRoute>} />
        <Route path="/post/:id" element={<PostPage user={user} />} />
        <Route path="/" element={<Jumbotron />} />
        <Route path="/users" element={<Navigate to="/users/login" />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
