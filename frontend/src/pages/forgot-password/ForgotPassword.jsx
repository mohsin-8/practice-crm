import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, HStack, Image, Text, Link as ChakraLink, FormControl, FormLabel, Input, Button, Alert, AlertIcon, Spinner, useToast } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import ForgotPasswordPageImage from "../../assets/images/forgot-password.jpg";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ForgotPasswordAction } from '../../redux/auth/authAction';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: "" });
    const [errors, setErrors] = useState({});

    const toast = useToast();
    const dispatch = useDispatch();
    const { isLoadingForgot, isForgotPassword, isForgotError } = useSelector(state => state.auth);

    useEffect(() => {
        if (isForgotPassword) {
            toast({
                title: "Reset link sent!",
                description: "Check your email for reset instructions.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [isForgotPassword, toast]);

    const validate = () => {
        let errors = {};

        if (!formData.email) {
            errors.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
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

    const ForgotPasswordHandleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(ForgotPasswordAction(formData));
        }
    };

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <HStack justifyContent={"center"} flexDir="column" h={"100vh"}>
                <Box maxW={"1230px"} mx={"auto"}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={10} alignItems={"center"}>
                        <GridItem>
                            <Image src={ForgotPasswordPageImage} alt="GoToLoginPageImage" borderRadius={"0.5rem"} />
                        </GridItem>
                        <GridItem>
                            <Box>
                                <Text fontSize={"28px"} mb={"5px"} fontWeight={"700"} color={"#343a40"}>Welcome to Trackly!</Text>
                                <Text fontSize={"16px"} mb={"20px"} fontWeight={"500"} color={"#64748b"}>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</Text>
                                {isForgotError && (
                                    <Alert status="error" mb="20px">
                                        <AlertIcon />
                                        {isForgotError}
                                    </Alert>
                                )}
                                <form onSubmit={ForgotPasswordHandleSubmit}>
                                    <FormControl mb={"20px"}>
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
                                    >
                                        {isLoadingForgot ? <Spinner size="sm" color="white" /> : <>Request Reset Password</>}
                                    </Button>
                                </form>
                                <Text mt={"20px"}>Don’t have an account? <ChakraLink as={RouterLink} to="/login"
                                    textDecor={"none !important"}
                                    color={"#605dff"}
                                    fontSize={"16px"}
                                    fontWeight={"500"}>Sign In</ChakraLink></Text>
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            </HStack>
        </>
    );
};

export default ForgotPassword;