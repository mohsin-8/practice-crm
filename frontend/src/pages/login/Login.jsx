import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, HStack, Image, Link as ChakraLink, Text, FormControl, FormLabel, Input, Button, Alert, AlertIcon, Spinner, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoToLoginPageImage from "../../assets/images/login.jpg";
import { MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../../redux/auth/authAction';

const Login = () => {
    console.log("is Rendered Login Page");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoginError, isAuthenticated, isLoadingLogin } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            setTimeout(() => {
                if (sessionStorage.getItem('token')) {
                    navigate("/");
                    toast({ title: "Login Successfull", position: "top-right", isClosable: true, status: "success" });
                }
            }, 1000);
        }
    }, [isAuthenticated, navigate, toast]);

    const validate = () => {
        let errors = {};

        if (!formData.email) {
            errors.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        // Check if password is not empty
        if (!formData.password) {
            errors.password = "Please enter your password.";
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

    const loginHandleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(LoginAction(formData));
        }
    };

    return (
        <HStack justifyContent={"center"} flexDir="column" h={"100vh"}>
            <Box maxW={"1230px"} mx={"auto"}>
                <Grid templateColumns='repeat(2, 1fr)' gap={10} alignItems={"center"}>
                    <GridItem>
                        <Image src={GoToLoginPageImage} alt="GoToLoginPageImage" borderRadius={"0.5rem"} />
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Text fontSize={"28px"} mb={"5px"} fontWeight={"700"} color={"#343a40"}>Welcome to Trackly!</Text>
                            <Text fontSize={"16px"} mb={"20px"} fontWeight={"500"} color={"#64748b"}>Sign In credentials</Text>
                            {isLoginError && (
                                <Alert status="error" mb="20px">
                                    <AlertIcon />
                                    {isLoginError}
                                </Alert>
                            )}
                            <form onSubmit={loginHandleSubmit}>
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
                                <Box mb={"20px"}>
                                    <ChakraLink
                                        as={RouterLink}
                                        to="/forgot-password"
                                        textDecor={"none !important"}
                                        color={"#605dff"}
                                        fontSize={"16px"}
                                        fontWeight={"500"}
                                    >
                                        Forgot Password?
                                    </ChakraLink>
                                </Box>
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
                                    disabled={isLoadingLogin}
                                >
                                    {isLoadingLogin ? <Spinner size="sm" color="white" /> : <><MdLogin size={18} /> Sign In</>}
                                </Button>
                            </form>
                            <Text mt={"20px"}>Don’t have an account? <ChakraLink as={RouterLink} to="/register"
                                textDecor={"none !important"}
                                color={"#605dff"}
                                fontSize={"16px"}
                                fontWeight={"500"}>Sign Up</ChakraLink></Text>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </HStack>
    );
};

export default Login;