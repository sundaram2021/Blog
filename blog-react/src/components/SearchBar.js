import React, { useState, useEffect } from "react";
import "../css/searchbar.css";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { MdClear } from "react-icons/md";

function SearchBar() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);

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
      setData(myBlogs);
    }
  }

  useEffect(() => {
    getData();
  }, [wordEntered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setSearch(!search);
  };

  function handleOnClick(id) {
    console.log(id);
    navigate(`/blogs/${id}`);
  }

  const handleSearch = () => {
    setSearch(!search);
  };

  return (
    <div className="search">
      <HiSearch className="search-bar pointer" onClick={handleSearch} />
      <div className="searchInputs" id={!search ? "" : "searchInputs"}>
        <input
          type="text"
          placeholder="Enter the topic...."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {!(filteredData.length === 0) ? (
            <MdClear onClick={clearInput} className="pointer"/>
          ) : (
            <HiSearch className="pointer"/>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult" id={!search ? "" : "dataResult"}>
          {filteredData.slice(0, 15).map((value) => {
            return (
              <a
                className="dataItem"
                href={value.link}
                target="_blank"
                rel="noneferrer"
                key={value._id}
                onClick={() => handleOnClick(value._id)}
              >
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
