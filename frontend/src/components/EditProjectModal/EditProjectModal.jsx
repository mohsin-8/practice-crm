import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';
import { FiPlus } from "react-icons/fi";
import AddingUsers from '../AddingUsers';
import AddingTags from '../AddingTags';
import { DeleteProjectTag } from '../../redux/projects/projectsAction';

const EditProjectModal = ({ isOpen, onClose, projectId, refreshUpdateTableData }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        startDate: '',
        endDate: '',
        projectDescription: '',
        budget: '',
        categories: '',
        assignMembers: [],
        priorityStatus: '',
        projectTags: []
    });

    const { isOpen: isAddingUsersOpen, onOpen: onAddingUsersOpen, onClose: onAddingUsersClose } = useDisclosure();
    const { isOpen: isAddingTagsOpen, onOpen: onAddingTagsOpen, onClose: onAddingTagsClose } = useDisclosure();

    const dispatch = useDispatch();
    const toast = useToast();
    const { isProjects } = useSelector(state => state.projects);

    useEffect(() => {
        if (projectId) {
            const project = isProjects?.find(data => data?._id === projectId);

            if (project) {
                setFormData({
                    projectName: project?.projectName,
                    startDate: project?.startDate,
                    endDate: project?.endDate,
                    projectDescription: project?.projectDescription,
                    budget: project?.budget,
                    categories: project?.categories,
                    assignMembers: project?.assignMembers,
                    priorityStatus: project?.priorityStatus,
                    projectTags: project?.projectTags
                });
            }
        }
    }, [projectId, isProjects]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const project_name = isProjects?.find(i => i?._id === projectId);

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
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent maxW={"1550px"}>
                <ModalHeader>
                    <span style={{ color: "rgb(96, 93, 255)" }}>
                        {project_name?.projectName}
                    </span> Edit
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Project Name</FormLabel>
                                    <Input
                                        type='text'
                                        name='projectName'
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        placeholder="Enter project name"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input
                                        type='date'
                                        name='startDate'
                                        value={moment(formData.startDate).format("YYYY-MM-DD")}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>End Date</FormLabel>
                                    <Input
                                        type='date'
                                        name='endDate'
                                        value={moment(formData.endDate).format("YYYY-MM-DD")}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Project Description</FormLabel>
                                    <Input
                                        type='text'
                                        name='projectDescription'
                                        value={formData.projectDescription}
                                        onChange={handleInputChange}
                                        placeholder="Enter project description"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Budget</FormLabel>
                                    <Input
                                        type='number'
                                        name='budget'
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        placeholder="Enter project budget"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Categories</FormLabel>
                                    <Input
                                        type='text'
                                        name='categories'
                                        value={formData.categories}
                                        onChange={handleInputChange}
                                        placeholder="Enter project categories"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Priority Status</FormLabel>
                                    <Select
                                        name="priorityStatus"
                                        value={formData.priorityStatus}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Assign Members</FormLabel>
                                    <Flex alignItems={"center"} justifyContent={"space-between"} mt={"15px"}>
                                        <Flex alignItems={"center"}>
                                            {formData?.assignMembers?.map((data) => {
                                                const nameParts = data?.name?.split(' ');
                                                const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase();
                                                const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() : '';
                                                return (
                                                    <Box key={data?._id} position="relative" zIndex={0} w={"30px"} h={"30px"} margin="0px -7px" _hover={{ pos: "relative", zIndex: "1", '.closeIcon': { display: 'flex', justifyContent: "center", alignItems: "center" } }}>
                                                        <Text display={"flex"} alignItems={"center"} justifyContent={"center"} bg={"rgb(96, 93, 255)"} textAlign={"center"} color={"#ffffff"} w={"100%"} h={"100%"} borderRadius={"100px"} fontSize={"14px"} fontWeight={400}>
                                                            {`${firstNameInitial}${lastNameInitial}`}
                                                        </Text>
                                                        <IconButton className="closeIcon" icon={<IoCloseOutline size={16} />} size={"s"} colorScheme="red" position="absolute" top="-5px" right="-2px" display="none" aria-label="Remove" borderRadius={"100px"} />
                                                    </Box>
                                                )
                                            })}
                                        </Flex>
                                        <Box display={"flex"} cursor={"pointer"} alignItems={"center"} justifyContent={"center"} bgColor={"transparent"} border={"2px solid rgb(96, 93, 255)"} borderRadius={"100px"} w={"30px"} h={"30px"} onClick={onAddingUsersOpen}>
                                            <FiPlus color='rgb(96, 93, 255)' size={16} />
                                        </Box>
                                        <AddingUsers projectId={projectId} isOpen={isAddingUsersOpen} onClose={onAddingUsersClose} />
                                    </Flex>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Project Tags</FormLabel>
                                    <Flex alignItems={"center"} justifyContent={"space-between"} mt={"15px"}>
                                        <Flex alignItems={"center"} gap={"10px"}>
                                            {formData?.projectTags?.map((data) => {
                                                return (
                                                    <Box key={data?._id} position="relative" zIndex={0} w={"100px"} h={"30px"} _hover={{ pos: "relative", zIndex: "1", '.closeIcon': { display: 'flex', justifyContent: "center", alignItems: "center" } }}>
                                                        <Text display={"flex"} alignItems={"center"} justifyContent={"center"} bg={"rgb(96, 93, 255)"} textAlign={"center"} color={"#ffffff"} w={"100%"} h={"100%"} borderRadius={"2px"} fontSize={"14px"} fontWeight={400}>
                                                            {data?.name}
                                                        </Text>
                                                        <IconButton onClick={() => DeleteTagFromProject(data?._id)} className="closeIcon" icon={<IoCloseOutline size={16} />} size={"s"} colorScheme="red" position="absolute" top="-5px" right="-2px" display="none" aria-label="Remove" borderRadius={"100px"} />
                                                    </Box>
                                                )
                                            })}
                                        </Flex>
                                        <Box display={"flex"} cursor={"pointer"} alignItems={"center"} justifyContent={"center"} bgColor={"transparent"} border={"2px solid rgb(96, 93, 255)"} borderRadius={"100px"} w={"30px"} h={"30px"} onClick={onAddingTagsOpen}>
                                            <FiPlus color='rgb(96, 93, 255)' size={16} />
                                        </Box>
                                        <AddingTags projectId={projectId} isOpen={isAddingTagsOpen} onClose={onAddingTagsClose} />
                                    </Flex>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Created By</FormLabel>
                                    {project_name?.createdBy?.map(data => {
                                        return (
                                            <Box key={data?._id} bgColor={"gray.200"} border={"2px solid rgb(230 230 231)"} p={"6px"}>{data?.name}</Box>
                                        )
                                    })}
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Flex justifyContent={"flex-end"}>
                                    <Button bgColor={"rgb(96, 93, 255)"} _hover={{ bgColor: "rgb(96, 93, 255)" }} color={"#ffffff"} type='submit'>
                                        Update Project
                                    </Button>
                                </Flex>
                            </GridItem>
                        </Grid>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default EditProjectModal;