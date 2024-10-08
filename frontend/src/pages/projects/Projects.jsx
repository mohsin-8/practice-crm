import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GetProjectAction } from '../../redux/projects/projectsAction';
import Layout from '../../components/Layout';
import { Avatar, Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { IoPencilOutline, IoSearch, IoTrashOutline } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa6';

const Projects = () => {
    const { isProject, isLoadingProject } = useSelector(state => state.projects);
    const dispatch = useDispatch();

    console.log(isProject, "isProject");

    useEffect(() => {
        dispatch(GetProjectAction());
    }, [dispatch]);

    return (
        <Layout>
            <Box m={"1.5rem 0px"}>
                <Text fontSize={"18px"} fontWeight={700}>Projects</Text>
            </Box>

            <Box p={"1.5rem"} bgColor={"#ffffff"} borderRadius={"0.5rem"}>
                <Flex alignItems="center" justifyContent={"space-between"}>
                    <InputGroup w={"282px"}>
                        <Input
                            placeholder='Search Project Here'
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
                    {/* {isLoadingProject && <Spinner color="red.500" size="xl" />} */}
                    <TableContainer border="1px solid #d5d9e2" borderRadius="15px" bgColor="white">
                        {isLoadingProject ? (
                            <Spinner size="xl" />
                        ) : (
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
                                    {isProject?.length > 0 ? (
                                        isProject?.map((data) => (
                                            <Tr key={data?._id}>
                                                <Td fontSize={"14px"} fontWeight={400}>{data?._id}</Td>
                                                <Td>
                                                    <Flex alignItems="center">
                                                        <Text fontSize={"14px"} fontWeight={400}>{data?.projectName}</Text>
                                                    </Flex>
                                                </Td>
                                                <Td fontSize={"14px"} fontWeight={400}>{data?.categories}</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>
                                                    <Flex alignItems={"center"}>
                                                        {data?.assignMembers?.map((member) => {
                                                            const nameParts = member?.name?.split(' ');
                                                            const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase();
                                                            const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() : '';

                                                            return (
                                                                <Text display={"flex"} alignItems={"center"} justifyContent={"center"} bg={"rgb(96, 93, 255)"} textAlign={"center"} color={"#ffffff"} w={"30px"} h={"30px"} borderRadius={"100px"} key={member?._id} fontSize={"14px"} fontWeight={400}>
                                                                    {`${firstNameInitial}${lastNameInitial}`}
                                                                </Text>
                                                            );
                                                        })}
                                                    </Flex>
                                                </Td>
                                                <Td fontSize={"14px"} fontWeight={400}>location</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>phone</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>projects</Td>
                                                <Td fontSize={"14px"} fontWeight={400}>8 OCT 2024</Td>
                                                <Td>
                                                    <IconButton variant="ghost" icon={<FaEye />} aria-label="view" size="md" />
                                                    <IconButton variant="ghost" icon={<IoPencilOutline />} aria-label="Edit" size="md" />
                                                    <IconButton variant="ghost" icon={<IoTrashOutline />} aria-label="Delete" color="red.500" size="md" />
                                                </Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={9} textAlign="center">
                                                <Text fontSize="22px" fontWeight={700} color={"#000000"}>No User Data Found!</Text>
                                            </Td>
                                        </Tr>)}
                                </Tbody>
                            </Table>
                        )}
                    </TableContainer>

                    <Flex justify="space-between" mt={4} alignItems="center">
                        <Text fontSize={"14px"} fontWeight={400}>Showing 1 to 5 of 12 results</Text>
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

export default Projects;