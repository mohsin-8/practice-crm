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
    useToast,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { OrderCreateAction } from '../../redux/order/orderAction';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHEABLE_KEY);

const AddNewOrder = () => {
    const [formData, setFormData] = useState({
        customer: "",
        company: "",
        items: [{ productId: "", price: "" }],
        status: "Pending",
        payment: { method: "Credit Card", status: "Unpaid", transactionId: "" },
        totalAmount: "",
        createdBy: "",
        leadId: ""
    });

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [mainKey, subKey] = name.split('.');

        setFormData((prevData) => {
            if (subKey) {
                return {
                    ...prevData,
                    [mainKey]: {
                        ...prevData[mainKey],
                        [subKey]: value,
                    },
                };
            }
            return { ...prevData, [name]: value };
        });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = formData.items.map((item, idx) =>
            idx === index ? { ...item, [name]: value } : item
        );
        setFormData((prevData) => ({ ...prevData, items: updatedItems }));
    };

    const addItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { productId: "", price: "" }],
        }));
    };

    const onSuccess = () => {
        toast({
            title: "Order Successfully Created",
            position: "top-right",
            isClosable: true,
            status: "success",
        });
        navigate("/sales/orders");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error.message);
            return;
        }

        dispatch(OrderCreateAction({
            ...formData,
            payment: {
                ...formData.payment,
                transactionId: paymentMethod.id,
            }
        }, onSuccess));
    };

    return (
        <>
            <Helmet>
                <title>Add New Order</title>
            </Helmet>
            <Layout>
                <Box m="1.5rem 0px">
                    <Text fontSize="18px" fontWeight={700}>Add New Order</Text>
                </Box>

                <Box p="1.5rem" bgColor="#ffffff" borderRadius="0.5rem">
                    <form onSubmit={handleSubmit}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Customer id</FormLabel>
                                    <Input
                                        type="text"
                                        name="customer"
                                        value={formData.customer}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Company id</FormLabel>
                                    <Input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Items</FormLabel>
                                    {formData.items.map((item, index) => (
                                        <Box key={index} mb={4}>
                                            <Input
                                                type="text"
                                                placeholder="Product ID"
                                                name="productId"
                                                value={item.productId}
                                                onChange={(e) => handleItemChange(index, e)}
                                                mb={2}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Product ID"
                                                name="price"
                                                value={item.price}
                                                onChange={(e) => handleItemChange(index, e)}
                                            />
                                        </Box>
                                    ))}
                                    <Button type="button" onClick={addItem}>Add Item</Button>
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Card Details</FormLabel>
                                    <CardElement />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Payment Method</FormLabel>
                                    <Select
                                        name="payment.method"
                                        value={formData.payment.method}
                                        onChange={handleChange}
                                    >
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Payment Status</FormLabel>
                                    <Select
                                        name="payment.status"
                                        value={formData.payment.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Unpaid">Unpaid</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Refunded">Refunded</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Total Amount</FormLabel>
                                    <Input
                                        type="number"
                                        name="totalAmount"
                                        min="0"
                                        value={formData.totalAmount}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Transaction ID (for Bank Transfer)</FormLabel>
                                    <Input
                                        type="text"
                                        name="payment.transactionId"
                                        value={formData.payment.transactionId}
                                        onChange={handleChange}
                                        isDisabled={formData.payment.method === 'Credit Card'}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Created By</FormLabel>
                                    <Input
                                        type="text"
                                        name="createdBy"
                                        value={formData.createdBy}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Lead #ID</FormLabel>
                                    <Input
                                        type="text"
                                        name="leadId"
                                        value={formData.leadId}
                                        onChange={handleChange}
                                    />
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
                                Add New Order
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Layout>
        </>
    );
};
const AddNewOrderWithStripe = () => (
    <Elements stripe={stripePromise}>
        <AddNewOrder />
    </Elements>
);
export default AddNewOrderWithStripe;