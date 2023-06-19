import React, { useEffect } from "react";
import "./styel.css";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";

function All_card({ data }) {
  const add = () => {
    localStorage.setItem("Book_id", data._id);
  };





  return (
    <div id="secondcarInventrys">
      <img
        src={data.img}
        alt=""
        style={{
          width: "100%",
          margin: "auto",
          height: "30em",
         padding:"20px",
         borderRadius:"50px"
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          marginBottom: "20px",
          marginLeft: "30px",
          marginTop: "20px",
        }}
      >

        <p className="text">
         
          <b> Book Title - {data.title} </b>
        </p>
        <p className="text">
         
         <b> Book Price - {data.price} </b>
       </p>
    


      </div>
      <div>
        <NavLink to="/singlePage">
          <Button colorScheme="whatsapp" mb={10} onClick={add}>
            see more detail
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default All_card;