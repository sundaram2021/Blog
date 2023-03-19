import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/saved.css";
import { AiFillDelete } from 'react-icons/ai'

function YourArticles() {
  const [yourArticles, setYourArticles] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    const fetchFirstName = async () => {
      const token = JSON.parse(localStorage.getItem("token2"));
      const res1 = await fetch("http://localhost:8999", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token,
        },
      });
      const { firstName } = await res1.json();
      setName(firstName);
    };
    fetchFirstName();
  }, []);

  useEffect(() => {
    getData();
  }, [name]);

  async function getData() {
    const token = JSON.parse(localStorage.getItem("token2"));
    const res = await fetch("http://localhost:8999/yourblogs", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    if (res.ok) {
      const { articles } = await res.json();
      // console.log("my articles ", articles);
      // console.log("myblogs "+myBlogs);
        const filteredBlogs = articles.filter((blg) => blg.createdBy === name)
      setYourArticles(filteredBlogs);
    }
  }

  if (yourArticles.length === 0) {
    return (
      <div style={{height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <h1>You does not have any blogs</h1>
        <button style={{backgroundColor: "black", color: "white", padding: "1.2rem", borderRadius: "10px"}}>
          <Link style={{color: "white", textDecoration: "none"}} to="/write">Create One</Link>
        </button>
      </div>
    );
  }

  const deleteBlog = async(e, id) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8999/deletearticles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const { message } = await res.json();

    alert(message);

  }

  return (
    <>
      <h2 className="h2">Your articles</h2>
      <div className="saved">
        {yourArticles.map((savedItem) => {
          return (
            <div key={savedItem._id}>
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h2>{savedItem.title}</h2>
                <AiFillDelete onClick={(e) => deleteBlog(e, savedItem._id)} style={{fontSize: "1.4rem", cursor: "pointer"}} title="Delete Blog" />
              </div>
              <section>{savedItem.body}</section>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default YourArticles;

// IoMdArrowDropdown
