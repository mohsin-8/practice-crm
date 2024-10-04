import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
import { Box, Text, Grid, GridItem, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserAction } from '../../redux/auth/authAction';

const AccountSettings = () => {
    const [formData, setFormData] = useState({ name: "", email: "", role: "", location: "", phone: "", projects: "", password: "" });
    const { isGetUser } = useSelector(state => state.auth);
    console.log(isGetUser, "users");

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
                projects: projects || "",
                password: ""
            });
        }
    }, [isGetUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                {/* {errors.name && <Text color="red.500" fontSize="14px">{errors.name}</Text>} */}
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
                                {/* {errors.email && <Text color="red.500" fontSize="14px">{errors.email}</Text>} */}
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
                                {/* {errors.phone && <Text color="red.500" fontSize="14px">{errors.phone}</Text>} */}
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
                        <GridItem>
                            <FormControl>
                                <FormLabel>Change Password</FormLabel>
                                <Input
                                    type='password'
                                    w={"100%"}
                                    h={"50px"}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='Change Password'
                                />
                                {/* {errors.password && <Text color="red.500" fontSize="14px">{errors.password}</Text>} */}
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <Box mt={"30px"}>
                        <Button
                            w={"100%"}
                            bg={"rgb(96, 93, 255)"}
                            _hover={{ bg: "rgb(96, 93, 255)" }}
                            color={"#ffffff"}
                            h={"50px"}
                            type='submit'
                        >
                            Update Profile
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    )
}

export default AccountSettings