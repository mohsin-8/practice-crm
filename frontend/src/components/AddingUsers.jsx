import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    Box,
    HStack,
    Text,
    Flex,
} from '@chakra-ui/react';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDataAction } from '../redux/users/usersAction';

const AddingUsers = ({ isOpen, onClose, projectId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const dispatch = useDispatch();

    const { isProjects } = useSelector(state => state.projects);
    const { isGetUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(GetUserDataAction());
    }, [dispatch]);

    const project_users = isProjects?.find(i => i._id === projectId);

    const filteredUsers = isGetUser?.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h={"500px"}>
                <ModalHeader>Add New Members</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input type="text" placeholder="Search for users..." onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} w={"100%"} h={"45px"} />
                    <Box
                        mt={2}
                        border="1px solid #e2e8f0"
                        borderRadius="md"
                        maxHeight="200px"
                        overflowY="auto"
                        boxShadow="lg"
                        bg="white"
                        position="absolute"
                        width="400px"
                        zIndex={10}
                    >
                        {filteredUsers?.length > 0 ? (
                            filteredUsers.map(user => (
                                <Box
                                    key={user._id}
                                    cursor="pointer"
                                    p={2}
                                    _hover={{ bg: "gray.100" }}
                                >
                                    {user.name}
                                </Box>
                            ))
                        ) : (
                            <Box p={2}>No users found</Box>
                        )}
                    </Box>
                    <Box mt="30px">
                        <HStack alignItems={"center"} gap={"8px"} flexWrap={"wrap"} justifyContent={"space-between"}>
                            {project_users?.assignMembers?.map((data) => {
                                return (
                                    <Flex key={data?._id} alignItems={"center"} justifyContent={"space-between"} bgColor={"#f6f7f9"} w={"150px"} h={"40px"} p={"12px"} borderRadius={"5px"} _hover={{ bgColor: "gray.200" }}>
                                        <Text fontSize={"14px"} fontWeight={400}>{data?.name}</Text>
                                        <IoCloseOutline cursor={"pointer"} size={20} fontWeight={900} color='rgb(96, 93, 255)' />
                                    </Flex>
                                )
                            })}
                        </HStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddingUsers;