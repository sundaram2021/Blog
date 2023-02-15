import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/blog.css";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

function Blogs() {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const comment = () => {
    return (
      <div>
        <h1>Hello div</h1>
      </div>
    );
  };

  const handleClick = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        alert("please copy again");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch("http://localhost:4000/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const { myBlogs } = await res.json();
      setBlogs([...blogs, myBlogs]);
    }
  }

  return (
    <>
      <Navbar />
      {blogs.map((item) => {
        return (
          <main key={item.title} className="blog-main">
            <div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
              <section>
                <div>
                  {like ? (
                    <FaHeart onClick={() => setLike(!like)} />
                  ) : (
                    <FaRegHeart onClick={() => setLike(!like)} />
                  )}
                  <FaRegComment onClick={comment} />
                </div>
                <div>
                  {save ? (
                    <FaBookmark onClick={() => setSave(!save)} />
                  ) : (
                    <FaRegBookmark onClick={() => setSave(!save)} />
                  )}
                  <FaShareAlt onClick={handleClick} />
                </div>
              </section>
            </div>
          </main>
        );
      })}
    </>
  );
}

export default Blogs;

//<FontAwesomeIcon icon="fa-solid fa-heart" />
