import React from 'react';
import { Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import { IoCloseOutline, IoPencilOutline, IoSearch, IoTrashOutline } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';

const leads = () => {
    return (
        <>
            <Helmet>
                <title>Leads</title>
            </Helmet>
            <Layout>
                <Box m={"1.5rem 0px"}>
                    <Text fontSize={"18px"} fontWeight={700}>All Leads</Text>
                </Box>

                <Box p={"1.5rem"} bgColor={"#ffffff"} borderRadius={"0.5rem"}>
                    <Flex alignItems="center" justifyContent={"space-between"}>
                        <InputGroup w={"282px"}>
                            <Input
                                placeholder='Search Leads Here'
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
                    </Flex>
                    <Box p={4}>
                        <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
                            <Table variant="simple">
                                <Thead bg="gray.100">
                                    <Tr>
                                        <Th fontSize={"14px"} fontWeight={600}>ID</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Project Name</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Category</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Assignees</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Budget</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Start Date</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>End Date</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Status</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td fontSize={"14px"} fontWeight={400}>data</Td>
                                        <Td>
                                            <Flex alignItems="center">
                                                <Text fontSize={"14px"} fontWeight={400}>data</Text>
                                            </Flex>
                                        </Td>
                                        <Td fontSize={"14px"} fontWeight={400}>data</Td>
                                        <Td fontSize={"14px"} fontWeight={400}>
                                            <Flex alignItems={"center"}>
                                                <Box position="relative" zIndex={0} w={"30px"} h={"30px"} margin="0px -7px" _hover={{ pos: "relative", zIndex: "1", '.closeIcon': { display: 'flex', justifyContent: "center", alignItems: "center" } }}>
                                                    <Text display={"flex"} alignItems={"center"} justifyContent={"center"} bg={"rgb(96, 93, 255)"} textAlign={"center"} color={"#ffffff"} w={"100%"} h={"100%"} borderRadius={"100px"} fontSize={"14px"} fontWeight={400}>
                                                        data
                                                    </Text>
                                                    <IconButton className="closeIcon" icon={<IoCloseOutline size={16} />} size={"s"} colorScheme="red" position="absolute" top="-5px" right="-2px" display="none" aria-label="Remove" borderRadius={"100px"} />
                                                </Box>
                                            </Flex>
                                        </Td>
                                        <Td fontSize={"14px"} fontWeight={400}>data</Td>
                                        <Td fontSize={"14px"} fontWeight={400}>data</Td>
                                        <Td fontSize={"14px"} fontWeight={400}>data</Td>
                                        <Td>
                                            <Text textAlign={"center"} py={"4px"} px={"4px"} borderRadius={"100px"} bgColor="lightgreen" fontSize={"14px"} fontWeight={400}>data</Text>
                                        </Td>
                                        <Td>
                                            <IconButton variant="ghost" icon={<FaEye />} aria-label="view" size="md" />
                                            <IconButton variant="ghost" icon={<IoPencilOutline />} aria-label="Edit" size="md" />
                                            <IconButton variant="ghost" icon={<IoTrashOutline />} aria-label="Delete" color="red.500" size="md" />
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>

                        <Flex justify="space-between" mt={4} alignItems="center">
                            <Text fontSize={"14px"} fontWeight={400}>Showing 1 to 5 of 100 results</Text>
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

export default leads;