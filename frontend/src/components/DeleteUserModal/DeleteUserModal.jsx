import React from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { UserDeleteAction } from '../../redux/users/usersAction';

const DeleteUserModal = ({ isOpen, onClose, userId }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const onSuccess = () => {
        toast({
            title: "Delete User Successfull",
            position: "top-right",
            isClosable: true,
            status: "success",
        });
    };

    const handleDeleteUser = () => {
        dispatch(UserDeleteAction(userId, onSuccess));
        onClose();
    };

    return (
        <>
            <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>User Delete Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize={"16px"} fontWeight={400}>Do you want to delete this user?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={"red.600"} _hover={{ bgColor: "red.600" }} color={"#ffffff"} onClick={handleDeleteUser}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteUserModal;