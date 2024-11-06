import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Select, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { LeadCreateAction } from '../../redux/leads/leadsAction';
import { useNavigate } from 'react-router-dom';

const AddNewLead = () => {
    const [formData, setFormData] = useState({ customer: "", email: "", phone: "", company: "", lead_source: "", status: "" });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

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

        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors = {};

        if (!formData.email) {
            errors.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!formData.customer) {
            errors.customer = "Please enter customer name.";
        }

        if (!formData.company) {
            errors.company = "Please enter company name.";
        }

        if (!formData.lead_source) {
            errors.lead_source = "Please enter Lead Source.";
        }

        if (!formData.status) {
            errors.status = "Please select status.";
        }

        if (!formData.phone) {
            errors.phone = "Please enter phone number.";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Please enter a valid 10-digit phone number.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSuccess = () => {
        toast({
            title: "New Lead has been Added",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 2000
        });
        navigate("/leads");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(LeadCreateAction(formData, onSuccess));
        }
        console.log(formData, "formData");
    };

    return (
        <Layout>
            <Box m={"1.5rem 0px"}>
                <Text fontSize={"18px"} fontWeight={700}>Add New Lead</Text>
            </Box>

            <Box p={"1.5rem"} bgColor={"#ffffff"} borderRadius={"0.5rem"}>
                <form onSubmit={handleSubmit}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Customer</FormLabel>
                                <Input
                                    type='text'
                                    w={"100%"}
                                    h={"50px"}
                                    name='customer'
                                    onChange={handleChange}
                                    value={formData.customer}
                                />
                                {errors.customer && <Text color="red.500" fontSize="14px">{errors.customer}</Text>}
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
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                                {errors.email && <Text color="red.500" fontSize="14px">{errors.email}</Text>}
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    type='tel'
                                    w={"100%"}
                                    h={"50px"}
                                    name='phone'
                                    onChange={handleChange}
                                    value={formData.phone}
                                />
                                {errors.phone && <Text color="red.500" fontSize="14px">{errors.phone}</Text>}
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Company</FormLabel>
                                <Input
                                    type='text'
                                    w={"100%"}
                                    h={"50px"}
                                    name='company'
                                    onChange={handleChange}
                                    value={formData.company}
                                />
                                {errors.company && <Text color="red.500" fontSize="14px">{errors.company}</Text>}
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Lead Source</FormLabel>
                                <Input
                                    type='text'
                                    w={"100%"}
                                    h={"50px"}
                                    name='lead_source'
                                    onChange={handleChange}
                                    value={formData.lead_source}
                                />
                                {errors.lead_source && <Text color="red.500" fontSize="14px">{errors.lead_source}</Text>}
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    name="status"
                                    h={"50px"}
                                    textTransform={"capitalize"}
                                    onChange={handleChange}
                                    value={formData.status}
                                >
                                    <option value="confirmed">confirmed</option>
                                    <option value="in progress">in progress</option>
                                    <option value="pending">pending</option>
                                    <option value="rejected">rejected</option>
                                </Select>
                                {errors.status && <Text color="red.500" fontSize="14px">{errors.status}</Text>}
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <Box mt={"30px"}>
                        <Button w={"100%"} bg={"rgb(96, 93, 255)"} _hover={{ bg: "rgb(96, 93, 255)" }} color={"#ffffff"} h={"50px"} type='submit'>Add New Lead</Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    )
}

export default AddNewLead;