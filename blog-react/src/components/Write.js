import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import "../css/write.css";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.bubble.css'

function Write() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    title: "",
    body: "",
    firstname: "",
  });

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
      ],
    },
  });

  if (quill) {
    quill.on("text-change", () => {
      // console.log("Text = "+quillRef.current.firstChild.getText());
      // const plainText = quillRef.current.getText();
      // console.log(plainText);
      setValue({ ...value, body: removeHtmlTags(quillRef.current.firstChild.innerHTML) }); // Get innerHTML using quillRef
    });
  }

  console.log(value);

  async function handleBlog() {
    console.log(value);
    const token = JSON.parse(localStorage.getItem("token2"));

    const res1 = await fetch("http://localhost:8999", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      },
    });

    const { firstName } = await res1.json();

    setValue({...value, firstname: firstName})


    console.log(firstName);
    // const obj = { _id: idx };
    const json = JSON.stringify(value);

    const res = await fetch("http://localhost:8999/blog", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("res ",res);
    if (res.ok) {
      setValue("");
      alert("Blog is Posted");
      navigate("/");
    }
  }

  function removeHtmlTags(text) {
    return text.replace(/<[^>]+>/g, '');
  }

  return (
    <>
      <Navbar />
      <div className="body">
        <div className="main-div">
          <input
            value={value.title}
            type="text"
            placeholder="enter the title..."
            onChange={(e) => setValue({ ...value, title: e.target.value })}
          />
          <div className="icons-div">
            <div>
              <div
                ref={quillRef}
                style={{
                  color: "black",
                  fontSize: "1.1rem",
                  height: "35vh",
                  border: "none",
                }}
                theme={"bubble"}
                
              />
            </div>
          </div>
          <button className="button" onClick={handleBlog}>
            publish
          </button>
        </div>
      </div>
    </>
  );
}

export default Write;
