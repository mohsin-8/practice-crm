import React from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { DeleteProjectAction } from '../../redux/projects/projectsAction';

const DeleteProjectModal = ({ isOpen, onClose, projectId }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const onSuccess = () => {
        toast({
            title: "Delete Project Successfully",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 2500
        });
    };

    const handleDeleteUser = () => {
        dispatch(DeleteProjectAction(projectId, onSuccess));
        onClose();
    };
    return (
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Project Delete Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={"16px"} fontWeight={400}>Do you want to delete this project?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button bgColor={"red.600"} _hover={{ bgColor: "red.600" }} color={"#ffffff"} onClick={handleDeleteUser}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteProjectModal;