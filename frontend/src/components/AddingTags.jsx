import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    HStack,
    Text,
    Flex,
    Input,
    useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import { GetTagsAction } from '../redux/tags/tagsAction';
import { DeleteProjectTag } from '../redux/projects/projectsAction';

const AddingTags = ({ projectId, isOpen, onClose }) => {
    const [openSearchBar, setOpenSearchBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { isProjects } = useSelector(state => state.projects);
    const { isGetTags } = useSelector(state => state.tags);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        dispatch(GetTagsAction());
    }, [dispatch]);

    const handleOpenSearch = () => {
        setOpenSearchBar(!openSearchBar);
    };

    const project_tags = isProjects?.find(i => i._id === projectId);

    const filteredTags = isGetTags?.filter(tag => tag?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    const onSuccessTagsDeleteFromProject = () => {
        toast({
            title: "Delete Tag from Project Successfully",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 2000
        });
    }

    const DeleteTagFromProject = (tagId) => {
        dispatch(DeleteProjectTag(tagId, projectId, onSuccessTagsDeleteFromProject));
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h={"500px"}>
                <ModalHeader>Add New Tags</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box cursor={"pointer"} borderRadius={"100px"} w={"38px"} h={"38px"} border={"2px solid rgb(96, 93, 255)"} display={"flex"} justifyContent={"center"} alignItems={"center"} onClick={handleOpenSearch}>
                        <FiPlus color='rgb(96, 93, 255)' size={16} />
                    </Box>
                    {openSearchBar && (
                        <Box
                            mt={2}
                            border="1px solid #e2e8f0"
                            borderRadius="md"
                            maxHeight="200px"
                            overflowY="auto"
                            boxShadow="lg"
                            bg="white"
                            width="100%"
                            p="10px"
                        >
                            <Input type='text' placeholder='Search For Tags...' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />

                            <Box mt="10px">
                                {filteredTags?.length > 0 ? (
                                    filteredTags.map((tag) => {
                                        const isTagInProject = project_tags?.projectTags?.find(i => i?._id === tag?._id);
                                        return !isTagInProject ? (
                                            <Box key={tag?._id} cursor="pointer" p={2} borderRadius={"4px"} _hover={{ bg: "rgb(96, 93, 255)", color: "#ffffff" }}>
                                                {tag?.name}
                                            </Box>
                                        ) : null;
                                    })
                                ) : (
                                    <Box p={2}>Press Space bar or comma to create a new tag</Box>
                                )}
                            </Box>
                        </Box>
                    )}
                    <Box mt="30px">
                        <HStack alignItems={"center"} gap={"8px"} flexWrap={"wrap"} justifyContent={"space-between"}>
                            {project_tags?.projectTags?.map((tag, index) => {
                                return (
                                    <Flex key={index} alignItems={"center"} justifyContent={"space-between"} bgColor={"#f6f7f9"} w={"150px"} h={"40px"} p={"12px"} borderRadius={"5px"} _hover={{ bgColor: "gray.200" }}>
                                        <Text fontSize={"14px"} fontWeight={400}>{tag.name}</Text>
                                        <IoCloseOutline cursor={"pointer"} size={20} fontWeight={900} color='rgb(96, 93, 255)' onClick={() => DeleteTagFromProject(tag?._id)} />
                                    </Flex>
                                );
                            })}
                        </HStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddingTags;