import React from 'react';
import '../App.css';
import { useState } from 'react';
import  { Link } from 'react-router-dom';
import img from '../images/img.jpg'
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  const [links, setLinks] = useState(false);

  const logout = () => {
    localStorage.removeItem("token2");
    navigate("/login");
  }

  return (
    <nav className='navbar'>
        <div className='logo'>
          <Link to="/">Blogpedia</Link>
        </div>
        <div className='main-links'>
          <div className='links' id={links ? "hidden" : ""}>
              <button className='btn' onClick={() => setLinks(!links)}>{links ? <FaTimes /> : <FaBars />}</button>
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to='/write'>Write</Link>
              {(localStorage.getItem('token2')) ? <Link onClick={logout} to='/'>Logout</Link> : <Link  to="/login">Login</Link>}
              {!(localStorage.getItem('token2')) ? <Link to='/register'>Register</Link> : ""}
          </div>
          {<UserImage /> || <img src={ img } alt='' />  }
          <div>
    </div>
        </div>
    </nav>
  )
}

export default Navbar


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
