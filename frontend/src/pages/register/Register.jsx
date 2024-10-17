import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { RegisterAction } from '../../redux/auth/authAction';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Grid, GridItem, HStack, Image, Link as ChakraLink, Text, FormControl, FormLabel, Input, Button, Spinner, Alert, AlertIcon, useToast } from '@chakra-ui/react'
import GoToRegisterPageImage from "../../assets/images/register.jpg";
import { MdOutlinePerson4 } from "react-icons/md";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const { isLoadingRegister, isRegisterError, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            setTimeout(() => {
                const role = localStorage.getItem('role');
                if (role) {
                    if (role === "admin") {
                        navigate("/dashboard");
                    } else if (role === "sales") {
                        navigate("/dashboard");
                    } else if (role === "support") {
                        navigate("/dashboard");
                    } else if (role === "team lead") {
                        navigate("/dashboard");
                    } else if (role === "manager") {
                        navigate("/dashboard");
                    }

                    toast({
                        title: "Registeration Successfull",
                        position: "top-right",
                        isClosable: true,
                        status: "success",
                    });
                }
            }, 1000);
        }
    }, [isAuthenticated, navigate, toast]);

    const validate = () => {
        let errors = {};

        if (!formData.name) {
            errors.name = "Please enter your name.";
        }

        if (!formData.email) {
            errors.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            errors.password = "Please enter your password.";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }

        if (!formData.role) {
            errors.role = "Please set your role.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const registerHandleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(RegisterAction(formData));
        }
    };

    return (
        <>
            <Helmet>
                <title>Profile Settings</title>
            </Helmet>
            <HStack justifyContent={"center"} flexDir="column" h={"100vh"}>
                <Box maxW={"1230px"} mx={"auto"}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={10} alignItems={"center"}>
                        <GridItem>
                            <Image src={GoToRegisterPageImage} alt="GoToRegisterPageImage" borderRadius={"0.5rem"} />
                        </GridItem>
                        <GridItem>
                            <Box>
                                <Text fontSize={"28px"} mb={"5px"} fontWeight={"700"} color={"#343a40"}>Sign up to Trackly Dashboard</Text>
                                <Text fontSize={"16px"} mb={"20px"} fontWeight={"500"} color={"#64748b"}>Sign Up enter your details</Text>

                                {isRegisterError && (
                                    <Alert status="error" mb="20px">
                                        <AlertIcon />
                                        {isRegisterError}
                                    </Alert>
                                )}

                                <form onSubmit={registerHandleSubmit}>
                                    <FormControl mb={"20px"} isInvalid={errors.name}>
                                        <FormLabel color={"#343a40"} fontSize={"14px"}>Full Name</FormLabel>
                                        <Input
                                            bgColor={"#fff"}
                                            border={"1px solid #d5d9e2"}
                                            color={"#000"}
                                            h={"60px"}
                                            placeholder="John Doe"
                                            name="name"
                                            type="text"
                                            onChange={handleChange}
                                        />
                                        {errors.name && <Text color="red.500" fontSize="14px">{errors.name}</Text>}
                                    </FormControl>

                                    <FormControl mb={"20px"} isInvalid={errors.email}>
                                        <FormLabel color={"#343a40"} fontSize={"14px"}>Email Address</FormLabel>
                                        <Input
                                            bgColor={"#fff"}
                                            border={"1px solid #d5d9e2"}
                                            color={"#000"}
                                            h={"60px"}
                                            placeholder="example@trackly.com"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                        />
                                        {errors.email && <Text color="red.500" fontSize="14px">{errors.email}</Text>}
                                    </FormControl>

                                    <FormControl mb={"20px"} isInvalid={errors.password}>
                                        <FormLabel color={"#343a40"} fontSize={"14px"}>Password</FormLabel>
                                        <Input
                                            bgColor={"#fff"}
                                            border={"1px solid #d5d9e2"}
                                            color={"#000"}
                                            h={"60px"}
                                            placeholder="Type Password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                        />
                                        {errors.password && <Text color="red.500" fontSize="14px">{errors.password}</Text>}
                                    </FormControl>

                                    <FormControl mb={"20px"} isInvalid={errors.role}>
                                        <FormLabel color={"#343a40"} fontSize={"14px"}>Set Role</FormLabel>
                                        <Input
                                            bgColor={"#fff"}
                                            border={"1px solid #d5d9e2"}
                                            color={"#000"}
                                            h={"60px"}
                                            placeholder="support, sales"
                                            name="role"
                                            type="text"
                                            onChange={handleChange}
                                        />
                                        {errors.role && <Text color="red.500" fontSize="14px">{errors.role}</Text>}
                                    </FormControl>

                                    <Button
                                        type="submit"
                                        gap={"10px"}
                                        bgColor={"#605dff"}
                                        color={"#ffffff"}
                                        borderRadius={"0.5rem"}
                                        h={"50px"}
                                        fontSize={"16px"}
                                        fontWeight={"600"}
                                        w={"100%"}
                                        _hover={{ bgColor: "#524fd9" }}
                                        disabled={isLoadingRegister}
                                    >
                                        {isLoadingRegister ? <Spinner size="sm" color="white" /> : <><MdOutlinePerson4 size={18} /> Sign Up</>}
                                    </Button>
                                </form>

                                <Text mt={"20px"}>Already have an account?
                                    <ChakraLink as={RouterLink} to="/login"
                                        textDecor={"none !important"}
                                        color={"#605dff"}
                                        fontSize={"16px"}
                                        fontWeight={"500"}> Sign In
                                    </ChakraLink>
                                </Text>
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            </HStack>
        </>
    )
}

export default Register;