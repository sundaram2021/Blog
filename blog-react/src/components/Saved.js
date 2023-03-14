import React, { useState, useEffect } from "react";
import "../css/saved.css";


function Saved() {
  const [savedBlogs, setSavedBlogs] = useState([]);

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
      console.log(myBlogs);
      // console.log("myblogs "+myBlogs);
      const filteredBlogs = myBlogs.filter((blg) => blg.save === true)
      setSavedBlogs(filteredBlogs);
    }
  }

  if(savedBlogs === "") {
    return <h1>You does not have any saved blogs</h1>
  }

  return (
    <>
      <h2 className="h2">Your Saved articles</h2>
      <div  className="saved">
        {savedBlogs.map((savedItem) => {
          return (
            <div key={savedItem._id}>
              <h2>{savedItem.title}</h2>
              <section>{savedItem.body}</section>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Saved;

// IoMdArrowDropdown