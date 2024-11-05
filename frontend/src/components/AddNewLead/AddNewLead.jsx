import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Select, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const AddNewLead = () => {
    const [formData, setFormData] = useState({ customer: "", email: "", phone: "", company: "", leadSource: "", status: "" });
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

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                    value={formData.leadSource}
                                />
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