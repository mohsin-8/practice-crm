import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Flex,
    useToast,
    Box,
    Text,
    HStack,
} from '@chakra-ui/react';
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from 'react-icons/io5';
import { FaPhone, FaSquarePollHorizontal } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { GrResources } from "react-icons/gr";

const ViewLeadsModal = ({ isOpen, onClose, isViewLeadModalData }) => {
    console.log(isViewLeadModalData);
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent maxW={"850px"}>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody py={"50px"}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <GridItem>
                            <Flex justifyContent={"start"} alignItems={"center"} gap={"8px"}>
                                <MdEmail color='rgb(96, 93, 255)' size={"22px"} />
                                <Text fontSize={"16px"} fontWeight={400} color={"#1A202c"}>{isViewLeadModalData?.email}</Text>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex alignItems={"center"} justifyContent={"start"} gap={"8px"}>
                                <IoPersonSharp color='rgb(96, 93, 255)' size={"22px"} />
                                <Text fontSize={"16px"} fontWeight={400} color={"#1A202c"}>{isViewLeadModalData?.customer}</Text>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex alignItems={"center"} justifyContent={"start"} gap={"8px"}>
                                <FaPhone color='rgb(96, 93, 255)' size={"22px"} />
                                <Text fontSize={"16px"} fontWeight={400} color={"#1A202c"}>{isViewLeadModalData?.phone}</Text>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex alignItems={"center"} justifyContent={"start"} gap={"8px"}>
                                <FaSquarePollHorizontal color='rgb(96, 93, 255)' size={"22px"} />
                                <Text fontSize={"16px"} fontWeight={400} color={"#1A202c"}>{isViewLeadModalData?.company}</Text>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex alignItems={"center"} justifyContent={"start"} gap={"8px"}>
                                <FaGlobe color='rgb(96, 93, 255)' size={"22px"} />
                                <Text fontSize={"16px"} fontWeight={400} color={"#1A202c"}>{isViewLeadModalData?.country}</Text>
                            </Flex>
                        </GridItem>
                        <GridItem>
                            <Flex alignItems={"center"} justifyContent={"start"} gap={"8px"}>
                                <GrResources color='rgb(96, 93, 255)' size={"22px"} />
                                <Text fontSize={"16px"} fontWeight={400} color={"#1A202c"}>{isViewLeadModalData?.lead_source}</Text>
                            </Flex>
                        </GridItem>
                    </Grid>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ViewLeadsModal;