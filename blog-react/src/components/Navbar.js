import React from 'react';
import '../App.css';
import { useState } from 'react';
import  { Link } from 'react-router-dom';
import img from '../images/img.jpg'
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import UserImage from './UserImage';


function Navbar({ user }) {

  const [links, setLinks] = useState(false);

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
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
          </div>
          {<img src={ img } alt='' /> ||  <UserImage name={user.name} />}
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
