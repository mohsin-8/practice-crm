import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import { Box, Flex, Input, InputGroup, InputRightElement, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Button, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { FaEye } from "react-icons/fa";
import { GetInvoiceAction } from '../../redux/invoice/invoiceAction';
import { useDispatch, useSelector } from "react-redux";

const InvoicesList = () => {
    const dispatch = useDispatch();
    const { isGetAllInvoices, isLoadingGetAllInvoices } = useSelector(state => state.invoice);

    useEffect(() => {
        dispatch(GetInvoiceAction());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Invoices</title>
            </Helmet>
            <Layout>
                <Box m={"1.5rem 0px"}>
                    <Text fontSize={"18px"} fontWeight={700}>Invoices List</Text>
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

                        <Link to="/invoice/add-new"
                            style={{
                                border: "1px solid rgb(96, 93, 255)",
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "rgb(96, 93, 255)",
                                borderRadius: "100px",
                                padding: "0.5rem 1.5rem"
                            }}>+ Add New Invoice</Link>
                    </Flex>
                    <Box p={4}>
                        <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
                            {isLoadingGetAllInvoices ? (
                                <Spinner size="xl" />
                            ) : (
                                <Table variant="simple">
                                    <Thead bg="gray.100">
                                        <Tr>
                                            <Th fontSize={"14px"} fontWeight={600}>Invoice ID</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Order ID</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Customer Name</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Company</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Merchant</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Company</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>View Full Invoice</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {isGetAllInvoices?.length > 0 ? (
                                            isGetAllInvoices?.map(data => {
                                                return (
                                                    <Tr key={data?._id}>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?._id}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.orderId}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.customerName}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.companyName.company}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.merchant}</Td>
                                                        <Td><Text textAlign={"center"} py={"4px"} px={"4px"} borderRadius={"100px"} fontSize={"14px"} fontWeight={400} bgColor={data?.status === "Pending" ? "lightgrey" : "transparent" && data?.status === "Processing" ? "lightskyblue" : "transparent" && data?.status === "Delivered" ? "lightgreen" : "transparent" && data?.status === "Cancelled" ? "red.400" : "transparent"}>{data?.status}</Text></Td>
                                                        <Td>
                                                            <IconButton variant="ghost" icon={<FaEye />} aria-label="Edit" size="md" mr={2} />
                                                        </Td>
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
                            <Text fontSize={"14px"} fontWeight={400}>Showing 1 to 1 of {isGetAllInvoices?.length} results</Text>
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

export default InvoicesList;