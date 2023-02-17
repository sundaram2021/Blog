import React from 'react'
import "../css/home.css";
import SearchBar from "./SearchBar";

function Footer() {
  return (
    <footer className='footer'>
      <h4>Hello footer</h4>
      <div>
          <SearchBar />
        </div>
    </footer>
  )
}

export default Footer