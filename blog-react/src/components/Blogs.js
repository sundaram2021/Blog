import React, { useState } from "react";
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

  const comment = () => {
    return (
      <div>
        <h1>Hello div</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="blog-main">
        <div>
          <h2>Hello</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae
            harum quibusdam nisi molestias. Quaerat ipsa at, aut sint
            perspiciatis excepturi officia voluptatum iure maxime, ut tempore ab
            necessitatibus eum totam sit distinctio accusantium. Rem possimus,
            accusamus accusantium error aspernatur tempore illum? Placeat id
            facere aspernatur illo corporis minima tenetur facilis? Minus atque
            cumque quidem voluptatem quaerat asperiores esse, reprehenderit unde
            accusamus odit dolorum cupiditate enim nemo, provident recusandae
            quod sequi quis eligendi rem. Tempora aliquam tenetur voluptatum
            sunt placeat, earum pariatur vel ab, aut voluptate dolorem odit
            cumque voluptates necessitatibus porro! Voluptate repellendus libero
            necessitatibus hic repellat modi deleniti vel.
          </p>
          <section>
            <div>
              {like ? (
                <FaHeart onClick={() => setLike(!like)} />
              ) : (
                <FaRegHeart onClick={() => setLike(!like)} />
              )}
              <FaRegComment onClick={comment}/>
            </div>
            <div>
              {save ? (
                <FaBookmark onClick={() => setSave(!save)} />
              ) : (
                <FaRegBookmark onClick={() => setSave(!save)} />
              )}
              <FaShareAlt />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Blogs;

//<FontAwesomeIcon icon="fa-solid fa-heart" />
