import React, { useEffect, useRef, useState } from "react";
import { FormLabel, Input, Select, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const initState = {
  title: "",
  author: "",
  description: "",
  img: "",
  customer_ratings: "",
  price: "",
  Genres: "",
  Publisher: "",
};

function EditForm({ post_Id,get_data_by_id,onClose }) {
  const [formData, setFormData] = useState(initState);
  const toast = useToast()
  // edit

  let result = Object.entries(formData)
    .filter(([key, value]) => value !== "")
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  const handle_post_submiting_from = async () => {
    // console.log(result);
    try {
      let res = await axios.put(
        `http://localhost:8088/book/${post_Id}`,
        result
      );
      toast({
        title: `${res.data}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: "top",
      })
      get_data_by_id()
      onClose()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <hr className="shareHr" />

        <div className="input_form">
          <Input
            placeholder={"Book title"}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Input
            placeholder={"Book author"}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />

          <Input
            placeholder={"Price"}
            type="number"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

          <Select
            placeholder="Genres"
            onChange={(e) =>
              setFormData({ ...formData, Genres: e.target.value })
            }
          >
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Biography">Biography</option>
            <option value="Novel">Novel</option>
            <option value="Mythology">Mythology</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Comic">Comic</option>
            <option value="Science fiction">Science fiction</option>
          </Select>

          <Select
            placeholder="Publisher"
            name="milage"
            onChange={(e) =>
              setFormData({ ...formData, Publisher: e.target.value })
            }
          >
            <option value="all">All</option>

            <option value="Indian Vedas">Indian Vedas</option>
            <option value="Arihant Books">Arihant Book</option>
            <option value="Rupa Publications">Rupa Publications</option>
            <option value="Roli Books">Roli Books</option>
            <option value="Roli Books">Roli Books</option>
          </Select>

          <Input
            placeholder={"Book rating"}
            type="number"
            onChange={(e) =>
              setFormData({ ...formData, customer_ratings: e.target.value })
            }
          />
          <Input
            placeholder={"Book description"}
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <button className="shareButton" onClick={handle_post_submiting_from}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
