import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Box, Button, Grid, GridItem, Input, Select, Text, useToast } from '@chakra-ui/react';
import { UserCreateAction } from '../../redux/users/usersAction';
import { useDispatch } from 'react-redux';

const AddNewUser = () => {
    const [formData, setFormData] = useState({ email: "", password: "", name: "", role: "", phone: "", location: "", projects: "" });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const isValidPhone = /^\d*$/.test(value);
            if (!isValidPhone) {
                setErrors({
                    ...errors,
                    phone: "Please enter a valid phone number without special characters.",
                });
            } else {
                setErrors({
                    ...errors,
                    phone: "",
                });
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let errors = {};

        if (!formData.email) {
            errors.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            errors.password = "Please enter your password.";
        }

        if (!formData.name) {
            errors.name = "Please enter your name.";
        }

        if (!formData.phone) {
            errors.phone = "Please enter your phone number.";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Please enter a valid 10-digit phone number.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSuccess = () => {
        toast({
            title: "User Created Successfully",
            description: "The new user has been added.",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 3000,
        });

        setFormData({ email: "", password: "", name: "", role: "", phone: "", location: "", projects: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(UserCreateAction(formData, onSuccess));
        }
    };

    return (
        <Layout>
            <Box m={"1.5rem 0px"}>
                <Text fontSize={"18px"} fontWeight={700}>Add New User</Text>
            </Box>

            <Box p={"1.5rem"} bgColor={"#ffffff"} borderRadius={"0.5rem"}>
                <form onSubmit={handleSubmit}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <GridItem>
                            <Input
                                type='text'
                                w={"100%"}
                                h={"50px"}
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Enter user name'
                            />
                            {errors.name && <Text color="red.500" fontSize="14px">{errors.name}</Text>}
                        </GridItem>
                        <GridItem>
                            <Input
                                type='email'
                                w={"100%"}
                                h={"50px"}
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter user email'
                            />
                            {errors.email && <Text color="red.500" fontSize="14px">{errors.email}</Text>}
                        </GridItem>
                        <GridItem>
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                h={"50px"}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="sales">Sales</option>
                                <option value="support">Support</option>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <Input
                                type='text'
                                w={"100%"}
                                h={"50px"}
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='Enter user location'
                            />
                        </GridItem>
                        <GridItem>
                            <Input
                                type='tel'
                                w={"100%"}
                                h={"50px"}
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder='Enter user phone number'
                            />
                            {errors.phone && <Text color="red.500" fontSize="14px">{errors.phone}</Text>}
                        </GridItem>
                        <GridItem>
                            <Input
                                type='number'
                                w={"100%"}
                                h={"50px"}
                                name='projects'
                                value={formData.projects}
                                onChange={handleChange}
                                placeholder='Enter user projects'
                            />
                        </GridItem>
                        <GridItem>
                            <Input
                                type='password'
                                w={"100%"}
                                h={"50px"}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter user password'
                            />
                            {errors.password && <Text color="red.500" fontSize="14px">{errors.password}</Text>}
                        </GridItem>
                        <GridItem>
                            <Button
                                w={"100%"}
                                bg={"rgb(96, 93, 255)"}
                                _hover={{ bg: "rgb(96, 93, 255)" }}
                                color={"#ffffff"}
                                h={"50px"}
                                type='submit'
                            >
                                Add New User
                            </Button>
                        </GridItem>
                    </Grid>
                </form>
            </Box>
        </Layout>
    )
}

export default AddNewUser;