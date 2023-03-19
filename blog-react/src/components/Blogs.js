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
import UserImage from "./UserImage";
import { AiFillDelete } from 'react-icons/ai'

function Blogs() {
  let c;
  const [blogs, setBlogs] = useState([]);

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

  // console.log(save);

  async function handleLike(e, id) {
    e.preventDefault();
    console.log(id);
    // console.log("liked");

    const obj = { _id: id };
    const json = JSON.stringify(obj);
    // console.log("liked");
    // console.log("json = " + json);

    const res = await fetch("http://localhost:8999/postlike", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (res.ok) {
      getData();
      // alert(message)
    }
  }

  async function handleSave(e, id) {
    e.preventDefault();
    console.log(id);
    const obj = { _id: id };
    const json = JSON.stringify(obj);
    console.log("saved");

    console.log("json = " + json);

    const res = await fetch("http://localhost:8999/postsave", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (res.ok) {
      getData();
      // alert(message)
    }
  }

  const publishComment = async (e, id) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token2"));

    const res1 = await fetch("http://localhost:8999", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      },
    });

    const { firstName } = await res1.json();

    if(c === ""){
      return <h1>Please enter some text</h1>
    }

    const obj = { _id: id, comment: c, firstname: firstName };
    const json = JSON.stringify(obj);

    const res = await fetch("http://localhost:8999/postcomment", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        Acccept: "application/json",
      },
    });
    if (res.ok) {
      getData();
      // alert(message)
    }
  };

  const handleComment = async (idx) => {
    // setComment(!comment);
    const obj = { _id: idx };
    const json = JSON.stringify(obj);

    const res = await fetch("http://localhost:8999/postcomment", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      getData();
      // alert(message) 
       
    }
  };

  const closeComment = async (idx) => {
    

    const obj = { _id: idx };
    const json = JSON.stringify(obj);

    console.log("json", json);

    console.log("id : ", idx);

    await fetch("http://localhost:8999/postcomment", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  const handleCommentChange = (e, idx) => {
    e.preventDefault();
    // console.log(e.target.value);
    // console.log(idx);
    // setCommentValue(e.target.value);

    c = e.target.value;
  };

  console.log(blogs);

  const deleteComment = async(e, blogId, commentId) => {
    e.preventDefault();

    console.log("blogid", blogId, 'commentId',commentId);

    const res = await fetch(`http://localhost:8999/api/blog/${blogId}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const { message }  = await res.json();

    alert(message);
    getData();
  }

  return (
    <>
      <Navbar />
      {blogs.map((item, idx) => {
        return (
          <main key={uuidv4()} className="blog-main">
            <div>
              <div className="head">
                <UserImage userName={item.createdBy} />
                <h2>{item.title}</h2>
              </div>
              <p>{item.body}</p>
              <section>
                <div>
                  {item.like ? (
                    <FaHeart onClick={(e) => handleLike(e, item._id)} />
                  ) : (
                    <FaRegHeart onClick={(e) => handleLike(e, item._id)} />
                  )}
                  <FaRegComment onClick={() => handleComment(item._id)} />
                </div>
                <div>
                  {item.save ? (
                    <FaBookmark onClick={(e) => handleSave(e, item._id)} />
                  ) : (
                    <FaRegBookmark onClick={(e) => handleSave(e, item._id)} />
                  )}
                  <FaShareAlt onClick={() => handleClick(item._id)} />
                </div>
              </section>
              {item.isChecked && (
                <section className={"comment"}>
                  <span onClick={() => closeComment(item._id)}>x</span>
                  <input
                    type="text"
                    onChange={(e) => handleCommentChange(e, item._id)}
                  />
                  <button onClick={(e) => publishComment(e, item._id)}>
                    publish
                  </button>
                </section>
              )}
              <h3>Comments...</h3>
              {item.comment.map((cmt) => {
                if(cmt.text === "") return null;
                return (
                  <section className="comment-section" key={cmt._id}>
                    
                    <div className="comment-section-div">
                      <UserImage
                        className="comment-section-img"
                        title={cmt.author}
                        userName={cmt.author}
                      />
                      
                      <div className="comment-section-nested-div">
                        <p className="date">published at {cmt.createdAt}</p>
                        <p className="actual-comment">{cmt.text}</p>
                        
                      </div>
                      <AiFillDelete onClick={(e) => deleteComment(e, item._id, cmt._id)} style={{cursor: "pointer"}} />
                    </div>
                    
                  </section>
                );
              })}
            </div>
          </main>
        );
      })}
    </>
  );
}

export default Blogs;

//<FontAwesomeIcon icon="fa-solid fa-heart" />
