import React, { useState } from 'react';
import Layout from '../../components/Layout';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Select,
    Text,
    useToast
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { CreateInvoiceAction } from "../../redux/invoice/invoiceAction";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const AddNewInvoice = () => {
    const [formData, setFormData] = useState({
        credit: 0,
        subtotal: 0,
        discount: 0,
        total: 0,
        toBePaid: 0,
        balance: 0,
        merchant: "",
        currency: "",
        dueDate: "",
        companyName: "",
        customerName: "",
        orderId: "",
        status: "Pending",
    });

    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSuccess = () => {
        toast({
            title: "Add new invoice Successfully",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 2000
        });
        navigate("/sales/invoices");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateInvoiceAction(formData, onSuccess));
        console.log(formData, "formData");
    };

    return (
        <>
            <Helmet>
                <title>Add New Invoice</title>
            </Helmet>
            <Layout>
                <Box m="1.5rem 0px">
                    <Text fontSize="18px" fontWeight={700}>Add New Invoice</Text>
                </Box>
                <Box p="1.5rem" bgColor="#ffffff" borderRadius="0.5rem">
                    <form onSubmit={handleSubmit}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Credit</FormLabel>
                                    <Input type="number" name='credit' onChange={handleChange} value={formData.credit} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Subtotal</FormLabel>
                                    <Input type="number" name='subtotal' onChange={handleChange} value={formData.subtotal} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Discount</FormLabel>
                                    <Input type="number" name='discount' onChange={handleChange} value={formData.discount} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Total</FormLabel>
                                    <Input type="number" name='total' onChange={handleChange} value={formData.total} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>To Be Paid</FormLabel>
                                    <Input type="number" name='toBePaid' onChange={handleChange} value={formData.toBePaid} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Balance</FormLabel>
                                    <Input type="number" name='balance' onChange={handleChange} value={formData.balance} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Company Id</FormLabel>
                                    <Input type="text" name='companyName' onChange={handleChange} value={formData.companyName} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Customer Name</FormLabel>
                                    <Input type="text" name='customerName' onChange={handleChange} value={formData.customerName} />
                                </FormControl>
                            </GridItem>
                            {/* <GridItem>
                                <FormControl>
                                    <FormLabel>User Name</FormLabel>
                                    <Input type="text" name='userName' onChange={handleChange} value={formData.userName} />
                                </FormControl>
                            </GridItem> */}
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Order Id</FormLabel>
                                    <Input type="text" name='orderId' onChange={handleChange} value={formData.orderId} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>
                                    <Select name="status" onChange={handleChange} value={formData.status}>
                                        <option value="Select Status">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Merchant</FormLabel>
                                    <Select name="merchant" onChange={handleChange} value={formData.merchant}>
                                        <option value="Select Merchant">Select Merchant</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Currency</FormLabel>
                                    <Select name="currency" onChange={handleChange} value={formData.currency}>
                                        <option value="Select Currency">Select Currency</option>
                                        <option value="Credit Card">USD</option>
                                        <option value="Bank Transfer">EURO</option>
                                        <option value="Bank Transfer">PKR</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Due Date</FormLabel>
                                    <Input type="date" name='dueDate' onChange={handleChange} value={formData.dueDate} />
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <Box mt="30px">
                            <Button
                                w="100%"
                                bg="rgb(96, 93, 255)"
                                _hover={{ bg: 'rgb(96, 93, 255)' }}
                                color="#ffffff"
                                type="submit"
                            >
                                Add New Invoice
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Layout>
        </>
    )
}

export default AddNewInvoice;