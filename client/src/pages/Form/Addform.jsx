
import React, { useEffect, useRef, useState } from "react";
import { Input, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";






const initState = {
  title: "",
  author: "",
  description: "",
  img: "",
  customer_ratings: 0,
  price: 0,
  Genres: "",
  Publisher: "",
};

function Addform({close,getPost}) {
  const [image, setimage] = useState("");
  const [formData, setFormData] = useState(initState);

  const toast = useToast()

  // cloudinaty && post

  const image_file_post_to_cloudinary_get_image_deploylink = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dd9cmhunr");

    fetch("https://api.cloudinary.com/v1_1/dd9cmhunr/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({ ...formData, img: data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Post request FE to DealersModel

  const handle_post_submiting_from = async () => {
    try {
      let res = await axios.post("https://analystt-ai-server.vercel.app/book", formData);
      toast({
        title: `${res.data}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top",
      })

      
      getPost()
    } catch (err) {
      console.log(err);
    }
  };




  if (formData.img !== "") {
    handle_post_submiting_from();
    // setFormData(initState)
    setFormData({ ...formData, img: "" });
    close()
    getPost()
  }

  return (

<div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div className="shareBottom">
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <AddIcon mr={2} className="shareIcon" />
                <span className="shareOptionText">Photo</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  // accept=".png,.jpeg,.jpg"
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </label>
              {image && (
                <div className="shareImgContainer">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    style={{
                      width: "50px",
                      borderRadius: "50px",
                    }}
                  />
                  <CloseIcon
                    className="shareCancelImg"
                    onClick={() => setimage("")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
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
          <option value="Biography">Biography</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Mythology">Mythology</option>
            <option value="Novel">Novel</option>
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



          <button
            className="shareButton"
            onClick={image_file_post_to_cloudinary_get_image_deploylink}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addform;






