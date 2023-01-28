import React from "react";
import Navbar from "./Navbar";
import "../css/home.css";
import img2 from '../images/write.png'
import img from '../images/read.png'
import { Link } from 'react-router-dom'
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="hero">
          <img src={img2} alt="" />
        </div>
        <div className="slogan">
          <h1>Stay curious</h1>
          <h3>Discover stories, thinking, and expertise from writers on any topic.</h3>
          <Link to="/write">Start writing</Link>
        </div>
      </main>
      <section className="section">
        <img src={img} alt="" />
        <div>
          <p>“Never trust anyone who has not brought a book with them.”</p>
          <p><strong>― Lemony Snicket, Horseradish</strong></p>
          <Link to="/blogs">Start Reading</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
