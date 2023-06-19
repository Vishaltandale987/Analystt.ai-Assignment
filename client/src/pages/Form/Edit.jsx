import { EditIcon } from "@chakra-ui/icons";
import {
  ModalOverlay,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import EditForm from "./EditForm";


function Edit({post_Id,get_data_by_id}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <EditIcon
        onClick={onOpen}

      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Specifications Edit form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditForm post_Id={post_Id} get_data_by_id={get_data_by_id} onClose={onClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Edit;