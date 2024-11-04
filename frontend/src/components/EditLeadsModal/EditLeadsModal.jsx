import React, { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { LeadUpdateAction } from "../../redux/leads/leadsAction";

const EditLeadsModal = ({ isOpen, onClose, LeadId, refreshUpdateTableData }) => {
    const [formData, setFormData] = useState({
        customer: "",
        email: "",
        phone: "",
        company: "",
        lead_source: "",
        status: "",
    });

    const dispatch = useDispatch();
    const toast = useToast();

    const { isGetAllLeads } = useSelector(state => state.leads);

    const lead_name = isGetAllLeads?.find(i => i?._id === LeadId);
    const status_arr = ["confirmed", "in progress", "rejected"];

    useEffect(() => {
        if (LeadId) {
            const lead = isGetAllLeads?.find(data => data?._id === LeadId);

            if (lead) {
                setFormData({
                    customer: lead?.customer,
                    email: lead?.email,
                    phone: lead?.phone,
                    company: lead?.company,
                    lead_source: lead?.lead_source,
                    status: lead?.status,
                });
            }
        }
    }, [LeadId, isGetAllLeads]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSuccess = () => {
        toast({
            title: "Lead has been updated Successfully",
            position: "top-right",
            isClosable: true,
            status: "success",
            duration: 2000
        });
        refreshUpdateTableData();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(LeadUpdateAction(LeadId, onSuccess, formData));
        onClose();
    };

    return (
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent maxW={"1550px"}>
                <ModalHeader>
                    <span style={{ color: "rgb(96, 93, 255)" }}>
                        #{lead_name?._id}
                    </span>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleEditSubmit}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Customer Name</FormLabel>
                                    <Input type='text' name='customer' placeholder="Enter customer name" value={formData.customer} onChange={handleInputChange} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Customer Email</FormLabel>
                                    <Input type='email' name='email' placeholder="Enter customer email address" value={formData.email} onChange={handleInputChange} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Phone</FormLabel>
                                    <Input type='number' name='phone' placeholder="Enter customer phone number" value={formData.phone} onChange={handleInputChange} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Company</FormLabel>
                                    <Input type='text' name='company' placeholder="Enter customer company" value={formData.company} onChange={handleInputChange} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Lead Source</FormLabel>
                                    <Input type='text' name='lead_source' placeholder="Enter customer Lead Source" value={formData.lead_source} onChange={handleInputChange} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>
                                    <Select name='status' value={formData.status} textTransform={"capitalize"} onChange={handleInputChange}>
                                        {status_arr?.map((status, index) => {
                                            return (
                                                <option key={index}>{status}</option>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Flex justifyContent={"flex-end"}>
                                    <Button bgColor={"rgb(96, 93, 255)"} _hover={{ bgColor: "rgb(96, 93, 255)" }} color={"#ffffff"} type='submit'>
                                        Update Lead
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

export default EditLeadsModal;