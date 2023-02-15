import React, { useState, useEffect } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import Navbar from "./Navbar";
import "../css/write.css";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    title: "",
    body: ""
  })

  const { quill, quillRef } = useQuill({
    modules : {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video']
      ]
    }
  });

  if (quill) {
    quill.on('text-change', () => {
      setValue({...value, body: quillRef.current.firstChild.innerHTML}); // Get innerHTML using quillRef
    });
  }




  async function handleBlog() {
    console.log(value);

    const res = await fetch("http://localhost:4000/blog", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        'Content-Type': "application/json",
      }
    })
    if(res.ok){
      setValue("")
      alert('Blog is Posted');
      navigate("/");
    }
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
            onChange={(e) => setValue({...value, title: e.target.value})}
          />
          <div className="icons-div">
            <div>
              <div ref={quillRef}  style={{color: 'black', fontSize: '1.1rem', height: '35vh', border: 'none'}} />
            </div>
          </div>  
          <button className="button" onClick={handleBlog}>publish</button>
        </div>
      </div>
    </>
  );
}

export default Write;
