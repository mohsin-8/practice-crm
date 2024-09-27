import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, HStack, Image, Text, Link as ChakraLink, FormControl, FormLabel, Input, Button, Alert, AlertIcon, Spinner, useToast } from '@chakra-ui/react';
import ForgotPasswordPageImage from "../../assets/images/forgot-password.jpg";
import { Link as RouterLink } from "react-router-dom";

const ForgotPassword = () => {
    return (
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
                            {/* {isLoginError && (
                                <Alert status="error" mb="20px">
                                    <AlertIcon />
                                    {isLoginError}
                                </Alert>
                            )} */}
                            <form>
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
                                    />
                                    {/* {errors.email && <Text color="red.500" fontSize="14px">{errors.email}</Text>} */}
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
                                    {/* {isLoadingLogin ? <Spinner size="sm" color="white" /> : <>Request Reset Password</>} */}
                                    Request Reset Password
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
    );
};

export default ForgotPassword;