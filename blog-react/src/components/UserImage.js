import React from "react";
import "../css/Avatar.css";
import img from "../images/img.jpg";
const UserImage = ({userName}) => {
  

  // const name = localStorage.getItem("firstName");
  // const initials =  userName[0].toUpperCase() : " ";
  // const url = `https://dummyimage.com/40x50/999/fff&text=${initials}`;

  const styles = {
    color: "black",
    fontSize: "10px",
    fontWeight: "800",
    // backgroundColor: "#" + Math.floor(100000 + Math.random() * 900000),
  };

  // const firstName = "John";
  const hex = '000000'
  const firstInitial = userName ? userName.charAt(0).toUpperCase() : "";
  // const randomHexColor = Math.floor(Math.random() * 16777215).toString(16); // generates a random hexadecimal color code
  const url = `https://dummyimage.com/40x50/${hex}/fff.png&text=${firstInitial}`;

  return (
    <img className="user-image" style={styles} src={url !== "" ? url : img} alt='' />
  );
};

export default UserImage;
