import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
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
    IconButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { IoPencilOutline, IoSearch, IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { LeadGetAllAction } from '../../redux/leads/leadsAction';
import moment from 'moment';
import EditLeadsModal from '../../components/EditLeadsModal/EditLeadsModal';

const Leads = () => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isEditLeadModalId, setEditLeadModalId] = useState(null);

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isGetAllLeads } = useSelector(state => state.leads);

    useEffect(() => {
        dispatch(LeadGetAllAction());
    }, [dispatch]);

    const handleOpenEditModal = (leadId) => {
        setEditLeadModalId(leadId);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setEditLeadModalId(null);
    };

    return (
        <>
            <Helmet>
                <title>Leads</title>
            </Helmet>
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
                        <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
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
                                    {isGetAllLeads?.length > 0 ? (
                                        isGetAllLeads?.map(data => {
                                            return (
                                                <Tr key={data?._id}>
                                                    <Td fontSize={"14px"} fontWeight={400}>{data?._id}</Td>
                                                    <Td>
                                                        <Flex alignItems="center">
                                                            {/* <Avatar size="sm" src={user.avatar} mr={3} /> */}
                                                            <Text fontSize={"14px"} fontWeight={400}>{data?.customer}</Text>
                                                        </Flex>
                                                    </Td>
                                                    <Td fontSize={"14px"} fontWeight={400}>{data?.email}</Td>
                                                    <Td fontSize={"14px"} fontWeight={400}>{data?.phone}</Td>
                                                    <Td fontSize={"14px"} fontWeight={400}>{moment(data.createdAt).format("DD MMM YYYY")}</Td>
                                                    <Td fontSize={"14px"} fontWeight={400}>{data?.company}</Td>
                                                    <Td fontSize={"14px"} fontWeight={400}>{data?.lead_source}</Td>
                                                    <Td><Text textAlign={"center"} py={"4px"} px={"4px"} borderRadius={"100px"} bgColor={data?.status === "confirmed" ? "lightgreen" : "transparent" && data?.status === "in progress" ? "lightgrey" : "transparent" && data?.status === "pending" ? "lightskyblue" : "transparent" && data?.status === "rejected" ? "red.400" : "transparent"} fontSize={"14px"} fontWeight={400}>{data?.status}</Text></Td>
                                                    <Td>
                                                        <IconButton variant="ghost" icon={<IoPencilOutline />} aria-label="Edit" size="md" mr={2} onClick={() => handleOpenEditModal(data?._id)} />
                                                        <IconButton variant="ghost" icon={<IoTrashOutline />} aria-label="Delete" color="red.500" size="md" onClick={() => { setEditLeadModalId(data?._id); onOpen(); }} />
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
                        </TableContainer>
                        <EditLeadsModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} LeadId={isEditLeadModalId} />

                        <Flex justify="space-between" mt={4} alignItems="center">
                            <Text fontSize={"14px"} fontWeight={400}>Showing 1 to 5 of 1 results</Text>
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

export default Leads;