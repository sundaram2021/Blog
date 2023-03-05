import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";

function Footer() {
  const userName = localStorage.getItem("firstName");
  return (
    <footer className="footer">
      <div>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/blogs">Blogs</Link>
        </div>
        <div>
          <Link to={`/${userName}/savedArticles`}>Saved articles</Link>
          <Link to="/write">Write</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
