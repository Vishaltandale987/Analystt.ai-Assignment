import React from 'react'

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
import Addform from './Addform';
function Add_Book({getPost}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
        <Button onClick={onOpen} colorScheme='whatsapp' p={5} mb={10}> + Add New Car</Button>

       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Specifications form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Addform close={onClose} getPost={getPost}/>
          </ModalBody>

      
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Add_Book