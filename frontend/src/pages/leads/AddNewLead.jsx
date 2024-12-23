import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Select, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { CreateLeadAction } from '../../redux/leads/leadsAction';
import { useNavigate } from 'react-router-dom';

const AddNewLead = () => {
    const [formData, setFormData] = useState({ customer: "", email: "", phone: "", company: "", lead_source: "" });

    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSuccess = () => {
        toast({
            title: "New Lead Created Successfully",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 2000,
        });
        navigate("/sales/leads");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateLeadAction(formData, onSuccess));
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
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type='text'
                                    w={"100%"}
                                    h={"50px"}
                                    name='customer'
                                    value={formData.customer}
                                    onChange={handleChange}
                                    placeholder='Customer'
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
                                    placeholder='Email'
                                />
                            </FormControl>

                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Phone*</FormLabel>
                                <Input
                                    type='number'
                                    w={"100%"}
                                    h={"50px"}
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='Phone*'
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
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder='Company'
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl>
                                <FormLabel>Lead Source</FormLabel>
                                <Select name='lead_source' onChange={handleChange}>
                                    <option value="Website">Website</option>
                                    <option value="Bark">Bark</option>
                                    <option value="Google">Google</option>
                                    <option value="Bing">Bing</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Thumbtack">Thumbtack</option>
                                    <option value="Other">Other</option>
                                </Select>
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
                            Add New Lead
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    )
}

export default AddNewLead;