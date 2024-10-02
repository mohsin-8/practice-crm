import React, { useEffect, useState } from 'react';
import { Button, Flex, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react';
import { UserUpdateAction } from '../../redux/users/usersAction';
import { useDispatch, useSelector } from 'react-redux';

const EditUserModal = ({ isOpen, onClose, userId, refreshUpdateTableData }) => {
    const [formData, setFormData] = useState({ name: "", email: "", role: "", location: "", phone: "", projects: "" });

    const { isUserData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        if (isOpen && userId) {
            const user = isUserData.find(i => i._id === userId);
            if (user) {
                setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    role: user.role || "",
                    location: user.location || "",
                    phone: user.phone || "",
                    projects: user.projects || ""
                })
            } else {
                setFormData({ name: "", email: "", role: "", location: "", phone: "", projects: "" });
            }
        }
    }, [isOpen, userId, isUserData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSuccess = () => {
        toast({
            title: "Update User Successfull",
            position: "top-right",
            isClosable: true,
            status: "success",
        });
        refreshUpdateTableData();
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.role) {
            toast({
                title: "All fields are required",
                status: "error",
                position: "top-right",
                isClosable: true,
            });
            return;
        }
        dispatch(UserUpdateAction(userId, formData, onSuccess));
        onClose();
    };
    return (
        <>
            <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent maxW={"750px"}>
                    <ModalHeader>User Edit Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleEditUser}>
                            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                <GridItem>
                                    <Input type='text' name='name' placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                                </GridItem>
                                <GridItem>
                                    <Input type='email' name='email' placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                                </GridItem>
                                <GridItem>
                                    <Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="sales">Sales</option>
                                        <option value="support">Support</option>
                                    </Select>
                                </GridItem>

                                <GridItem>
                                    <Input type='text' name='location' placeholder="Enter your location" value={formData.location} onChange={handleChange} />
                                </GridItem>
                                <GridItem>
                                    <Input type='tel' name='phone' placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                                </GridItem>
                                <GridItem>
                                    <Input type='text' name='projects' placeholder="Enter your projects" value={formData.projects} onChange={handleChange} />
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <Flex justifyContent={"flex-end"}>
                                        <Button bgColor={"rgb(96, 93, 255)"} _hover={{ bgColor: "rgb(96, 93, 255)" }} color={"#ffffff"} type='submit'>Update User</Button>
                                    </Flex>
                                </GridItem>
                            </Grid>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditUserModal;