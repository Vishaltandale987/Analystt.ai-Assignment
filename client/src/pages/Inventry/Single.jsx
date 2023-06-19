import axios from "axios";
import React, { useEffect, useState } from "react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";

import { Navigate, useNavigate } from "react-router-dom";
import Edit from "../Form/Edit";

function Single() {
  let post_Id = localStorage.getItem("Book_id");
  const [post, setPost] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast()
  //   console.log(post)

  const get_data_by_id = async () => {
    try {
      const res = await axios(`https://analystt-ai-server.vercel.app/book/${post_Id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_data_by_id();
  }, []);

  const handle_book_delete = async () => {
    try {
      const res = await axios.delete(`https://analystt-ai-server.vercel.app/book/${post?._id}`);
     console.log(res)
      toast({
        title: `${res.data}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: "top",
      })
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <div className="singlediv">
      <div className="editanddelete">

      <IconButton
        variant="outline"
        colorScheme="biue"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<Edit post_Id={post._id}  get_data_by_id={get_data_by_id}/>}
        />

      <IconButton
        variant="outline"
        colorScheme="pink"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<DeleteIcon onClick={onOpen} />}
        />
        </div>

      <img
        src={post?.img}
        alt=""
        style={{
          margin: "auto",
          width: "90%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          marginBottom: "20px",
          marginLeft: "50px",
          marginTop: "20px",
        }}
      >
        <p className="text">
          {" "}
          <b> Book Title - {post?.title} </b>
        </p>
        <p className="text">
          {" "}
          <b> Book Author - {post?.author} </b>
        </p>
        <p className="text">
          {" "}
          <b> Description - {post?.description} </b>
        </p>
        <p className="text">
          {" "}
          <b> Price - {post?.price} </b>
        </p>
        <p className="text">
          {" "}
          <b> Book Genres - {post?.Genres} </b>
        </p>
        <p className="text">
          {" "}
          <b> Book Publisher - {post?.Publisher} </b>
        </p>
      </div>

      <Button
        colorScheme="facebook"
        mb={10}
        onClick={() => alert("Work in Progress.")}
      >
        Buy
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <p>
              {" "}
              <b> Are you sure you want to delete book post. </b>
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handle_book_delete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Single;
