import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import { IoPencilOutline, IoSearch, IoTrashOutline } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { GetLeadsAction } from '../../redux/leads/leadsAction';
import EditLeadsModal from '../../components/EditLeadsModal/EditLeadsModal';
import DeleteLeadsModal from '../../components/DeleteLeadsModal/DeleteLeadsModal';
import { Link, useNavigate } from 'react-router-dom';

const Leads = () => {
    const [selectedLeadId, setSelectedLeadId] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isAllLeads, isLoadingAllLeads } = useSelector((state) => state.leads);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(GetLeadsAction());
    }, [dispatch]);

    const handleOpenEditModal = (projectId) => {
        setSelectedLeadId(projectId);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedLeadId(null);
    };

    const refreshUpdateTableData = () => {
        dispatch(GetLeadsAction());
    };

    const handleOpenViewLeadModal = (id) => {
        navigate(`/sales/lead/details/${id}`);
    };


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

                        <Link to="/sales/lead/create"
                            style={{
                                border: "1px solid rgb(96, 93, 255)",
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "rgb(96, 93, 255)",
                                borderRadius: "100px",
                                padding: "0.5rem 1.5rem"
                            }}>+ Create Lead</Link>
                    </Flex>
                    <Box p={4}>
                        <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
                            {isLoadingAllLeads ? (
                                <Spinner size="xl" />
                            ) : (
                                <Table variant="simple">
                                    <Thead bg="gray.100">
                                        <Tr>
                                            <Th fontSize={"14px"} fontWeight={600}>ID</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Customer</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Email</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Phone</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Company</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Lead Source</Th>
                                            <Th fontSize={"14px"} fontWeight={600}>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {isAllLeads?.length > 0 ? (
                                            isAllLeads?.map(data => {
                                                return (
                                                    <Tr key={data?._id}>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?._id}</Td>
                                                        <Td>
                                                            <Flex alignItems="center">
                                                                <Text fontSize={"14px"} fontWeight={400}>{data?.customer}</Text>
                                                            </Flex>
                                                        </Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.email}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.phone}</Td>

                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.company}</Td>
                                                        <Td fontSize={"14px"} fontWeight={400}>{data?.lead_source}</Td>

                                                        <Td>
                                                            <IconButton variant="ghost" icon={<FaEye />} aria-label="view" size="md" onClick={() => handleOpenViewLeadModal(data?._id)} />
                                                            <IconButton variant="ghost" icon={<IoPencilOutline />} aria-label="Edit" size="md" onClick={() => handleOpenEditModal(data?._id)} />
                                                            <IconButton variant="ghost" icon={<IoTrashOutline />} aria-label="Delete" color="red.500" size="md" onClick={() => { setSelectedLeadId(data?._id); onOpen(); }} />
                                                        </Td>
                                                    </Tr>
                                                )
                                            })
                                        ) : (
                                            <Tr>
                                                <Td colSpan={9} textAlign="center">
                                                    <Text fontSize="22px" fontWeight={700} color={"#000000"}>No Lead Found!</Text>
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            )
                            }
                        </TableContainer>
                        <EditLeadsModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} leadId={selectedLeadId} refreshUpdateTableData={refreshUpdateTableData} />
                        <DeleteLeadsModal isOpen={isOpen} onClose={onClose} leadId={selectedLeadId} />

                        <Flex justify="space-between" mt={4} alignItems="center">
                            <Text fontSize={"14px"} fontWeight={400}>Showing 1 to 1 of {isAllLeads?.length} results</Text>
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