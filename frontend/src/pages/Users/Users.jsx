import React, { useState } from 'react';
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Avatar,
    IconButton,
    Button
} from '@chakra-ui/react';
import { IoEyeOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import Layout from '../../components/Layout';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Users = () => {
    const userData = [
        {
            id: "#JAN-158",
            name: "Marcia Baker",
            email: "marcia@trezo.com",
            location: "Washington D.C",
            phone: "+1 555-445-4455",
            projects: 6,
            joinDate: "01 Dec 2024",
            avatar: "https://i.pravatar.cc/300",
        },
        {
            id: "#JAN-325",
            name: "Carolyn Barnes",
            email: "barnes@trezo.com",
            location: "Chicago",
            phone: "+1 555-455-9966",
            projects: 10,
            joinDate: "02 Dec 2024",
            avatar: "https://i.pravatar.cc/301",
        },
        // Add more users as needed...
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate the users to display based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = userData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(userData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <Layout>
            <Box m={"1.5rem 0px"}>
                <Text fontSize={"18px"} fontWeight={700}>Users List</Text>
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

                    <Link to="/users/add-user"
                        style={{
                            border: "1px solid rgb(96, 93, 255)",
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "rgb(96, 93, 255)",
                            borderRadius: "100px",
                            padding: "0.5rem 1.5rem"
                        }}>+ Add New User</Link>
                </Flex>
                <Box p={4}>
                    <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
                        <Table variant="simple">
                            <Thead bg="gray.100">
                                <Tr>
                                    <Th fontSize={"14px"} fontWeight={600}>User ID</Th>
                                    <Th fontSize={"14px"} fontWeight={600}>User</Th>
                                    <Th fontSize={"14px"} fontWeight={600}>Email</Th>
                                    <Th fontSize={"14px"} fontWeight={600}>Location</Th>
                                    <Th fontSize={"14px"} fontWeight={600}>Phone</Th>
                                    <Th fontSize={"14px"} fontWeight={600}>Projects</Th>
                                    <Th fontSize={"14px"} fontWeight={600}>Join Date</Th>
                                    <Th fontSize={"14px"} fontWeight={600}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentUsers.map((user, index) => (
                                    <Tr key={index}>
                                        <Td fontSize={"14px"} fontWeight={400}>{user.id}</Td>
                                        <Td>
                                            <Flex alignItems="center">
                                                <Avatar size="sm" src={user.avatar} mr={3} />
                                                <Text fontSize={"14px"} fontWeight={400}>{user.name}</Text>
                                            </Flex>
                                        </Td>
                                        <Td fontSize={"14px"} fontWeight={400}>{user.email}</Td>
                                        <Td fontSize={"14px"} fontWeight={400}>{user.location}</Td>
                                        <Td fontSize={"14px"} fontWeight={400}>{user.phone}</Td>
                                        <Td fontSize={"14px"} fontWeight={400}>{user.projects}</Td>
                                        <Td fontSize={"14px"} fontWeight={400}>{user.joinDate}</Td>
                                        <Td>
                                            <IconButton
                                                variant="ghost"
                                                icon={<IoEyeOutline />}
                                                aria-label="View"
                                                size="md"
                                                mr={2}
                                                color="rgb(96, 93, 255)"
                                            />
                                            <IconButton
                                                variant="ghost"
                                                icon={<IoPencilOutline />}
                                                aria-label="Edit"
                                                size="md"
                                                mr={2}
                                            />
                                            <IconButton
                                                variant="ghost"
                                                icon={<IoTrashOutline />}
                                                aria-label="Delete"
                                                color="red.500"
                                                size="md"
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <Flex justify="space-between" mt={4} alignItems="center">
                        <Text fontSize={"14px"} fontWeight={400}>Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {userData.length} results</Text>
                        <Flex>
                            <Button onClick={handlePrevPage} isDisabled={currentPage === 1} mr={2}>
                                Previous
                            </Button>
                            <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>
                                Next
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Layout>
    )
}

export default Users;