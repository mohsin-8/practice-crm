import React, { useEffect, useState } from 'react';
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
    Button,
    useDisclosure,
    Spinner
} from '@chakra-ui/react';
import moment from 'moment';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import Layout from '../../components/Layout';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { UserDataAction } from '../../redux/users/usersAction';
import DeleteUserModal from '../../components/DeleteUserModal/DeleteUserModal';
import EditUserModal from '../../components/EditUserModal/EditUserModal';

const Users = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const dispatch = useDispatch();

    const { isUserData, isLoadingUser, isLoadingDeleteUser } = useSelector(state => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        dispatch(UserDataAction());
    }, [dispatch]);

    const handleOpenEditModal = (userId) => {
        setSelectedUserId(userId);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedUserId(null);
    };

    const refreshUpdateTableData = () => {
        dispatch(UserDataAction());
    }

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

                    <Link to="/hr/users/add-new"
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
                    {isLoadingDeleteUser && <Spinner color="red.500" size="xl" />}
                    <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
                        {isLoadingUser ? (
                            <Spinner size="xl" />
                        ) : (
                            <Table variant="simple">
                                <Thead bg="gray.100">
                                    <Tr>
                                        <Th fontSize={"14px"} fontWeight={600}>User ID</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>User</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Email</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Role</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Location</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Phone</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Projects</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Join Date</Th>
                                        <Th fontSize={"14px"} fontWeight={600}>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {isUserData?.length > 0 ? isUserData?.map(user => {
                                        return (
                                            <Tr key={user._id}>
                                                <Td fontSize={"14px"} fontWeight={400}>{user._id}</Td>
                                                <Td>
                                                    <Flex alignItems="center">
                                                        <Avatar size="sm" src={user.avatar} mr={3} />
                                                        <Text fontSize={"14px"} fontWeight={400}>{user.name}</Text>
                                                    </Flex>
                                                </Td>
                                                <Td fontSize={"14px"} fontWeight={400}>{user.email}</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>{user.role}</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>{user.location}</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>{user.phone}</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>{user.projects}</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>{moment(user.createdAt).format("DD MMM YYYY")}</Td>
                                                <Td>
                                                    <IconButton variant="ghost" icon={<IoPencilOutline />} aria-label="Edit" size="md" mr={2} onClick={() => handleOpenEditModal(user._id)} />
                                                    <IconButton variant="ghost" icon={<IoTrashOutline />} aria-label="Delete" color="red.500" size="md" onClick={() => { setSelectedUserId(user._id); onOpen(); }} />
                                                    <DeleteUserModal isOpen={isOpen} onClose={onClose} userId={selectedUserId} />
                                                </Td>
                                            </Tr>
                                        )
                                    }) : (
                                        <Box textAlign={"center"}>
                                            <Text fontSize="22px" fontWeight={700} color={"#000000"}>No Data Found!!!</Text>
                                        </Box>
                                    )}
                                </Tbody>
                            </Table>
                        )}
                    </TableContainer>
                    <EditUserModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} userId={selectedUserId} refreshUpdateTableData={refreshUpdateTableData} />

                    <Flex justify="space-between" mt={4} alignItems="center">
                        <Text fontSize={"14px"} fontWeight={400}>Showing 1 to 5 of {isUserData.length} results</Text>
                        <Flex>
                            <Button mr={2}>Previous</Button>
                            <Button>Next</Button>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Layout>
    )
}

export default Users;