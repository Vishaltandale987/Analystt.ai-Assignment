import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styel.css";

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
  Select,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import All_card from "./All_card";
import Add_Book from "../Form/Add_Book";
import { SearchIcon } from "@chakra-ui/icons";

function Inventry() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Bookdata, setBookdata] = useState();
  const [selectedGenresValue, setselectedGenresValue] = useState("all");
  const [selected_PriceValue, setSelected_PriceValue] = useState("all");
  const [selected_PublisherValue, setselected_PublisherValue] = useState("all");

  const [search, setsearch] = useState("");

  const [searchdata, setsearchdata] = useState();

  // get post
  const getPost = async () => {
    try {
      const res = await axios(
        `https://analystt-ai-server.vercel.app/book/${selectedGenresValue}/${selected_PriceValue}/${selected_PublisherValue}`
      );
      setBookdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(search)
  const getSearchPost = async () => {
    try {
      const res = await axios(`https://analystt-ai-server.vercel.app/book/search/${search}`);
    
      setsearchdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_Genres_Change = (event) => {
    setselectedGenresValue(event.target.value);
  };

  const handle_price_Change = (event) => {
    setSelected_PriceValue(event.target.value);
  };

  const handle_Publisher_Change = (event) => {
    setselected_PublisherValue(event.target.value);
  };

  // console.log(selectedGenresValue)

  useEffect(() => {
    getPost();
  }, [selectedGenresValue, selected_PriceValue, selected_PublisherValue]);

  useEffect(() => {
    if(search !== ""){
      getSearchPost();
    }
  }, [search]);

  return (
    <div>
      <p
        style={{
          color: "rgb(220, 20, 60)",
          fontFamily: "inherit",
          fontSize: "50px",
          marginBottom: "30px",
        }}
      >
        {" "}
        <b> Book Inventry</b>{" "}
      </p>

      <div className="filter">
        <Add_Book getPost={getPost} />

        <Select
          placeholder="Genres"
          w="400"
          style={{
            border: "2px solid black",
            width: "200px",
          }}
          onChange={handle_Genres_Change}
        >
          <option value="all">All</option>

          <option value="Fiction">Fiction</option>
          <option value="Biography">Biography</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Mythology">Mythology</option>
          <option value="Novel">Novel</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Comic">Comic</option>
          <option value="Science fiction">Science fiction</option>
        </Select>

        <Select
          placeholder="Price"
          w="400"
          name="price"
          onChange={handle_price_Change}
          style={{
            border: "2px solid black",
            width: "200px",
          }}
        >
          <option value="all">All</option>

          <option value="0">Under 500</option>
          <option value="500">500 to 1000</option>
          <option value="1000">1000 to 1500</option>
          <option value="1500">1500 to 2000</option>
          <option value="2000">more then 2000</option>
        </Select>

        <Select
          placeholder="Publisher"
          w="400"
          name="milage"
          onChange={handle_Publisher_Change}
          style={{
            border: "2px solid black",
            width: "200px",
          }}
        >
          <option value="all">All</option>

          <option value="Indian Vedas">Indian Vedas</option>
          <option value="Arihant Books">Arihant Book</option>
          <option value="Rupa Publications">Rupa Publications</option>
          <option value="Roli Books">Roli Books</option>
          <option value="Roli Books">Roli Books</option>
        </Select>

        {/* <DealerSearch/> */}

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Search Book"
            onChange={(e) => setsearch(e.target.value)}
            w={200}
            style={{
              border: "2px solid black",
            }}
          />
        </InputGroup>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Specifications form</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div id="secondcarInventry">
        {search === "" ? (
          <>
            {Bookdata?.map((el, index) => {
              return <All_card key={index} data={el} />;
            })}
          </>
        ) : (
          <>
            {searchdata?.map((el, index) => {
              return <All_card key={index} data={el} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Inventry;
