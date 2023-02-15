import React from "react";
import "../css/Avatar.css";
import img from "../images/img.jpg";
const UserImage = () => {
  const name = localStorage.getItem("firstName");
  const initials = name[0].toUpperCase();
  const url = `https://dummyimage.com/40x50/999/fff&text=${initials}`;

  const styles = {
    color: "black",
    fontSize: "10px",
    fontWeight: "800",
    backgroundColor: "#" + Math.floor(100000 + Math.random() * 900000),
  };

  return (
    <img className="user-image" style={styles} src={url !== "" ? url : img} />
  );
};

export default UserImage;
