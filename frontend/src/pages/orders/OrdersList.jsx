import React, { useEffect } from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import { Box, Flex, Input, InputGroup, InputRightElement, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Spinner } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { OrderGetAllAction } from '../../redux/order/orderAction';

const OrdersList = () => {
    const { isGetAllOrder, isLoadingGetAllOrder } = useSelector(state => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(OrderGetAllAction());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Order List</title>
            </Helmet>
            <Layout>
                <Box m={"1.5rem 0px"}>
                    <Text fontSize={"18px"} fontWeight={700}>Order List</Text>
                </Box>

                <Box p={"1.5rem"} bgColor={"#ffffff"} borderRadius={"0.5rem"}>
                    <Flex alignItems="center" justifyContent={"space-between"}>
                        <InputGroup w={"282px"}>
                            <Input
                                placeholder='Search Here'
                                bgColor={"#f6f7f9"}
                                border={"1px solid #d5d9e2"}
                                p={"10px 20px"}
                                h={"46px"}
                                type='text'
                            />
                            <InputRightElement h={"100%"} p={"0 10px"}>
                                <IoSearch color="#605dff" size={20} />
                            </InputRightElement>
                        </InputGroup>

                        <Link to="/sales/order/add-new"
                            style={{
                                border: "1px solid rgb(96, 93, 255)",
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "rgb(96, 93, 255)",
                                borderRadius: "100px",
                                padding: "0.5rem 1.5rem"
                            }}>+ Add New Order</Link>
                    </Flex>
                    <Box p={4}>
                        <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
                            {isLoadingGetAllOrder ? (
                                <Spinner size="xl" />
                            ) : (
                                <Table variant="simple">
                                    <Thead bg="gray.100">
                                        <Tr>
                                            <Th fontSize={"14px"} fontWeight={600}>Lead Id</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Order No.</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Client Name</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Total Amount</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Company</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Created By</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Status</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Created At</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {isGetAllOrder?.length > 0 ? (
                                            isGetAllOrder?.map(data => {
                                                return (
                                                    <Tr key={data?._id}>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.leadId}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?._id}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.customer?.customer}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>${data?.totalAmount}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.company?.company}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.createdBy}</Td>
                                                        <Td><Text textAlign={"center"} py={"4px"} px={"4px"} borderRadius={"100px"} bgColor={data?.status === "Pending" ? "lightgrey" : "transparent" && data?.status === "Processing" ? "lightskyblue" : "transparent" && data?.status === "Delivered" ? "lightgreen" : "transparent" && data?.status === "Cancelled" ? "red.400" : "transparent"} fontSize={"14px"} fontWeight={400}>{data?.status}</Text></Td>
                                                        <Td><Text textAlign={"center"} py={"4px"} px={"4px"} borderRadius={"100px"} fontSize={"14px"} fontWeight={400}>{moment(data.createdAt).format("DD MMM YYYY")}</Text></Td>
                                                    </Tr>
                                                )
                                            })
                                        ) : (
                                            <Tr>
                                                <Td colSpan={9} textAlign="center">
                                                    <Text fontSize="22px" fontWeight={700} color={"#000000"}>No Leads Found!</Text>
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            )}
                        </TableContainer>

                        <Flex justify="space-between" mt={4} alignItems="center">
                            <Text fontSize={"14px"} fontWeight={400}>Showing 1 to 1 of 1 results</Text>
                            <Flex>
                                <Button mr={2}>Previous</Button>
                                <Button>Next</Button>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Layout>
        </>
    )
}

export default OrdersList;