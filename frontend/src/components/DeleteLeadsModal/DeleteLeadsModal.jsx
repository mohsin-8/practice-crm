import React from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { LeadDeleteAction } from '../../redux/leads/leadsAction';

const DeleteLeadsModal = ({ isOpen, onClose, leadId, refreshUpdateTableData }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const onSuccess = () => {
        toast({
            title: "Lead has been Deleted Successfully",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 2000
        });
        refreshUpdateTableData();
    };

    const handleDeleteLead = () => {
        dispatch(LeadDeleteAction(leadId, onSuccess));
        onClose();
    };

    return (
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Lead Delete Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={"16px"} fontWeight={400}>Do you want to delete this Lead?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button bgColor={"red.600"} _hover={{ bgColor: "red.600" }} color={"#ffffff"} onClick={handleDeleteLead}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteLeadsModal;