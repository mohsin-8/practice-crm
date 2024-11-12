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
} from '@chakra-ui/react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import stripePromise from '../../StripeConfig';

const AddNewOrder = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [formData, setFormData] = useState({
        customer: '',
        company: '',
        items: [{ productId: '', price: '' }],
        status: 'Pending',
        paymentMethod: 'Credit Card',
        totalAmount: '',
        createdBy: '',
        leadId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (index, e) => {
        const newItems = [...formData.items];
        newItems[index][e.target.name] = e.target.value;
        setFormData({ ...formData, items: newItems });
    };

    const addNewItem = () => {
        setFormData({ ...formData, items: [...formData.items, { productId: '', price: '' }] });
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
            console.error(error);
            return;
        }

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    payment: {
                        method: formData.paymentMethod,
                        status: 'Unpaid',
                        transactionId: paymentMethod.id,
                    },
                }),
            });

            if (response.ok) {
                console.log('Order created successfully!');
            } else {
                console.error('Failed to create order');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <Layout>
            <Elements stripe={stripePromise}>
                <Box m={'1.5rem 0px'}>
                    <Text fontSize={'18px'} fontWeight={700}>
                        Add New Order
                    </Text>
                </Box>

                <Box p={'1.5rem'} bgColor={'#ffffff'} borderRadius={'0.5rem'}>
                    <form onSubmit={handleSubmit}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Customer</FormLabel>
                                    <Input
                                        type="text"
                                        w={'100%'}
                                        h={'50px'}
                                        name="customer"
                                        value={formData.customer}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Company</FormLabel>
                                    <Input
                                        type="text"
                                        w={'100%'}
                                        h={'50px'}
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>

                            {formData.items.map((item, index) => (
                                <GridItem key={index} colSpan={2}>
                                    <FormControl>
                                        <FormLabel>Item {index + 1}</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Product ID"
                                            name="productId"
                                            value={item.productId}
                                            onChange={(e) => handleItemChange(index, e)}
                                            mb={2}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            name="price"
                                            value={item.price}
                                            onChange={(e) => handleItemChange(index, e)}
                                        />
                                    </FormControl>
                                </GridItem>
                            ))}
                            <Button mt={4} onClick={addNewItem}>
                                Add Another Item
                            </Button>

                            <GridItem>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        name="status"
                                        h={'50px'}
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
                                        name="paymentMethod"
                                        h={'50px'}
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                    >
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Total Amount</FormLabel>
                                    <Input
                                        type="number"
                                        w={'100%'}
                                        h={'50px'}
                                        name="totalAmount"
                                        value={formData.totalAmount}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Created By</FormLabel>
                                    <Input
                                        type="text"
                                        w={'100%'}
                                        h={'50px'}
                                        name="createdBy"
                                        value={formData.createdBy}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Lead ID</FormLabel>
                                    <Input
                                        type="text"
                                        w={'100%'}
                                        h={'50px'}
                                        name="leadId"
                                        value={formData.leadId}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </GridItem>
                        </Grid>

                        <Box mt={'30px'}>
                            <CardElement />
                        </Box>

                        <Box mt={'30px'}>
                            <Button
                                w={'100%'}
                                bg={'rgb(96, 93, 255)'}
                                _hover={{ bg: 'rgb(96, 93, 255)' }}
                                color={'#ffffff'}
                                h={'50px'}
                                type="submit"
                            >
                                Add New Order
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Elements>
        </Layout>
    );
};

export default AddNewOrder;