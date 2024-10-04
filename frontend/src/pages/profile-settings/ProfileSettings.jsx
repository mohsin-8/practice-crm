import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
import { Box, Text, Grid, GridItem, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { GetChangePasswordAction, GetUserAction } from '../../redux/auth/authAction';
import { UserUpdateAction } from '../../redux/users/usersAction';

const AccountSettings = () => {
    const [formData, setFormData] = useState({ name: "", email: "", role: "", location: "", phone: "", projects: "", currentPassword: "", newPassword: "", confirmNewPassword: "" });
    const [errors, setErrors] = useState({});

    const { isGetUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        dispatch(GetUserAction());
    }, [dispatch]);

    useEffect(() => {
        if (isGetUser) {
            const { name, email, role, location, phone, projects } = isGetUser;
            setFormData({
                name: name || "",
                email: email || "",
                role: role || "",
                location: location || "",
                phone: phone || "",
                projects: projects || ""
            });
        } else {
            setFormData({ name: "", email: "", role: "", location: "", phone: "", projects: "" });
        }
    }, [isGetUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let errors = {};

        if (!formData.currentPassword) {
            errors.currentPassword = "Please enter current your password.";
        } else if (formData.currentPassword.length < 6) {
            errors.currentPassword = "Password must be at least 6 characters long.";
        } else if (!formData.newPassword) {
            errors.newPassword = "Please enter new password.";
        } else if (formData.newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters long.";
        } else if (!formData.confirmNewPassword) {
            errors.confirmNewPassword = "Please enter new password.";
        } else if (formData.confirmNewPassword.length < 6) {
            errors.confirmNewPassword = "Password must be at least 6 characters long.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSuccess = () => {
        toast({
            title: "Update Profile Successfull",
            position: "top-right",
            isClosable: true,
            status: "success",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(UserUpdateAction(isGetUser?._id, formData, onSuccess));
    };

    const onSuccessChangePassword = () => {
        toast({
            title: "Update New Password Successfull",
            position: "top-right",
            isClosable: true,
            status: "success",
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast({
                title: "Passwords do not match",
                position: "top-right",
                isClosable: true,
                status: "error",
            });
            return;
        }

        const data = {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmNewPassword
        };

        if (validate()) {
            dispatch(GetChangePasswordAction(data));
            onSuccessChangePassword();
        } else {
            toast({
                title: "Validation failed. Please check your inputs.",
                position: "top-right",
                isClosable: true,
                status: "warning",
            });
        }
    };

    return (
        <Layout>
            <Box m={"1.5rem 0px"}>
                <Text fontSize={"18px"} fontWeight={700}>Profile Settings</Text>
            </Box>

            <Box p={"1.5rem"} bgColor={"#ffffff"} borderRadius={"0.5rem"}>
                <form onSubmit={handleSubmit}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type='text'
                                    w={"100%"}
                                    h={"50px"}
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='Enter user name'
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    type='email'
                                    w={"100%"}
                                    h={"50px"}
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Enter user email'
                                />
                            </FormControl>

                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Roles</FormLabel>
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
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Location</FormLabel>
                                <Input
                                    type='text'
                                    w={"100%"}
                                    h={"50px"}
                                    name='location'
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder='Enter user location'
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    type='tel'
                                    w={"100%"}
                                    h={"50px"}
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='Enter user phone number'
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Projects</FormLabel>
                                <Input
                                    type='number'
                                    w={"100%"}
                                    h={"50px"}
                                    name='projects'
                                    value={formData.projects}
                                    onChange={handleChange}
                                    placeholder='Enter user projects'
                                />
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <Box mt={"30px"}>
                        <Button w={"100%"} bg={"rgb(96, 93, 255)"} _hover={{ bg: "rgb(96, 93, 255)" }} color={"#ffffff"} h={"50px"} type='submit'>
                            Update Profile
                        </Button>
                    </Box>
                </form>
            </Box>

            <Box p={"1.5rem"} bgColor={"#ffffff"} borderRadius={"0.5rem"} mt={"30px"}>
                <form onSubmit={handlePasswordSubmit}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Current Password</FormLabel>
                                <Input type='password' w={"100%"} h={"50px"} name='currentPassword' value={formData.currentPassword} onChange={handleChange} placeholder='Enter your current password' />
                                {errors.currentPassword && <Text color="red.500" fontSize="14px">{errors.currentPassword}</Text>}
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input type='password' w={"100%"} h={"50px"} name='newPassword' value={formData.newPassword} onChange={handleChange} placeholder='Enter your new password' />
                                {errors.newPassword && <Text color="red.500" fontSize="14px">{errors.newPassword}</Text>}
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Confirm New Password</FormLabel>
                                <Input type='password' w={"100%"} h={"50px"} name='confirmNewPassword' value={formData.confirmNewPassword} onChange={handleChange} placeholder='Confirm your new password' />
                                {errors.confirmNewPassword && <Text color="red.500" fontSize="14px">{errors.confirmNewPassword}</Text>}
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <Box mt={"30px"}>
                        <Button w={"100%"} bg={"rgb(96, 93, 255)"} _hover={{ bg: "rgb(96, 93, 255)" }} color={"#ffffff"} h={"50px"} type='submit'>
                            Update New Password
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    )
}

export default AccountSettings;