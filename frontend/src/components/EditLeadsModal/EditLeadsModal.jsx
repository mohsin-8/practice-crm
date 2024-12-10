import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'

const EditLeadsModal = ({ isOpen, onClose, leadId, refreshUpdateTableData }) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent maxW={"1550px"}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Project Name</FormLabel>
                                    <Input
                                        type='text'
                                        name='projectName'
                                        placeholder="Enter project name"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Project Name</FormLabel>
                                    <Input
                                        type='text'
                                        name='projectName'
                                        placeholder="Enter project name"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Project Name</FormLabel>
                                    <Input
                                        type='text'
                                        name='projectName'
                                        placeholder="Enter project name"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Project Name</FormLabel>
                                    <Input
                                        type='text'
                                        name='projectName'
                                        placeholder="Enter project name"
                                    />
                                </FormControl>
                            </GridItem>
                        </Grid>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default EditLeadsModal;