import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/blog.css";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function Blogs() {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState({});
  const [blogs, setBlogs] = useState([]);
  // const [myArray, setMyArray] = useState({});

  const comment = () => {
    return (
      <div>
        <h1>Hello div</h1>
      </div>
    );
  };

  console.log(save);

  const handleClick = (id) => {
    console.log(id);
    const url = window.location.href + "/" + id;
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
    const res = await fetch("http://localhost:8999/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const { myBlogs } = await res.json();
      // console.log(myBlogs);
      // console.log("myblogs "+myBlogs);
      setBlogs(myBlogs);
    }
  }

  console.log(save);

  return (
    <>
      <Navbar />
      {blogs.map((item, idx) => {
        return (
          <main key={uuidv4()} className="blog-main">
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
                    <FaBookmark onClick={(e) => setSave({[item]: e.target.value})} />
                  ) : (
                    <FaRegBookmark onClick={() => setSave(!save)} />
                  )}
                  <FaShareAlt onClick={() => handleClick(item._id)} />
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
