import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import img from "../images/img.jpg";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { IoMdArrowDropdown } from "react-icons/io";

function Navbar() {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  const [links, setLinks] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  // const userName = localStorage.getItem("firstName")

  const logout = () => {
    localStorage.removeItem("token2");
    navigate("/login");
  };

  const handleDropdown = () => {
    setShowDropDown(!showDropdown)
  }



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
      await setUserName(firstName);
      // localStorage.setItem("firstName", firstName);
    }
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token2")); // set your token here
    getUser(token);
  }, [getUser]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Blogpedia</Link>
      </div>
      <div className="main-links">
        <div className="links" id={links ? "hidden" : ""}>
          <button className="btn" onClick={() => setLinks(!links)}>
            {links ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/write">Write</Link>
          {localStorage.getItem("token2") ? (
            <Link onClick={logout} to="/">
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {!localStorage.getItem("token2") ? (
            <Link to="/register">Register</Link>
          ) : (
            ""
          )}
          
        </div>
        <SearchBar />
        {/* <button>Serach</button> */}
        {<UserImage userName={userName} /> || <img src={img} alt="" />}
        <IoMdArrowDropdown style={{ cursor: "pointer" }} onClick={handleDropdown} />
         {
          showDropdown && (
            <div className="dropdown">
              <Link to={`/${userName}/savedArticles`}>Saved articles</Link>
              <Link to='/yourarticles'>Your articles</Link>
            </div>
          )
         }
      </div>
    </nav>
  );
}

export default Navbar;

// signInWithGoogle.then((result) => {
//   const name = result.user.displayName;
//   const email = result.user.email;
//   const profilePic = result.user.photoURL;
//   console.log(result.user.auth.emailVerified);

//   localStorage.setItem("name", name)
//   localStorage.setItem("email", email)
//   localStorage.setItem("ProfilePic", profilePic)
// }).catch((err) => {
//   console.log(err);
// })
