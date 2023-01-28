import React, { useState, useEffect } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import Navbar from "./Navbar";
import "../css/write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState('');
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

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setValue(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  console.log(value);
  return (
    <>
      <Navbar />
      <div className="body">
        <div className="main-div">
          <input
            value={title}
            type="text"
            placeholder="enter the title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="icons-div">
            <div>
              <div ref={quillRef} style={{color: 'black', fontSize: '1.1rem', height: '35vh', border: 'none'}} />
            </div>
          </div>  
          <button className="button">publish</button>
        </div>
      </div>
    </>
  );
}

export default Write;
