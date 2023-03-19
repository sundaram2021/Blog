import "./App.css";
import { useEffect, useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home ";
import Blogs from "./components/Blogs";
import Write from "./components/Write";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./components/Blog";
import Saved from "./components/Saved";
import YourArticles from "./components/YourArticles";

function App() {
  const [userName, setUserName] = useState();
  const getUser = useCallback(async (token) => {
    const res = await fetch("http://localhost:8999", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      },
    });
  
    if (res.ok) {
      const { firstName } = await res.json();
      setUserName(firstName);
      // localStorage.setItem("firstName", firstName);
    }
  }, []);
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token2")); // set your token here
    getUser(token);
  }, [getUser]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path={`/${userName}/savedArticles`} element={<Saved />} />
        <Route path='/yourarticles' element={<YourArticles />} />
      </Routes>
    </>
  );
}

export default App;
