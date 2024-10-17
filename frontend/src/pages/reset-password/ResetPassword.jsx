import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, HStack, Image, Text, FormControl, FormLabel, Input, Button, Alert, AlertIcon, Spinner, useToast } from '@chakra-ui/react';
import { Helmet } from "react-helmet-async";
import ForgotPasswordPageImage from "../../assets/images/forgot-password.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { ResetPasswordAction } from '../../redux/auth/authAction';

const ResetPassword = () => {
    const { token } = useParams();
    const [formData, setFormData] = useState({ password: "" });
    const [errors, setErrors] = useState({});

    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoadingResetPassword, isResetPassword, isResetPasswordError } = useSelector(state => state.auth);

    useEffect(() => {
        if (isResetPassword) {
            toast({
                title: "Password has been changed!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate("/login");
        }
    }, [isResetPassword, toast, navigate]);

    const validate = () => {
        let errors = {};

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

    const ForgotPasswordHandleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(ResetPasswordAction(formData, token));
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
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
                                <Text fontSize={"16px"} mb={"20px"} fontWeight={"500"} color={"#64748b"}>Please Reset your password.</Text>
                                {isResetPasswordError && (
                                    <Alert status="error" mb="20px">
                                        <AlertIcon />
                                        {isResetPasswordError}
                                    </Alert>
                                )}
                                <form onSubmit={ForgotPasswordHandleSubmit}>
                                    <FormControl mb={"20px"}>
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
                                        {isLoadingResetPassword ? <Spinner size="sm" color="white" /> : <>Reset Password</>}
                                    </Button>
                                </form>
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            </HStack>
        </>
    );
};

export default ResetPassword;