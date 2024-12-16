import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateLeadByIdAction } from '../../redux/leads/leadsAction';

const EditLeadsModal = ({ isOpen, onClose, leadId, refreshUpdateTableData }) => {
    const [formData, setFormData] = useState({ customer: "", email: "", phone: null, company: "", lead_source: "", status: "" });

    const { isAllLeads } = useSelector((state) => state.leads);

    const toast = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen && leadId) {
            const lead = isAllLeads.find(i => i?._id === leadId);
            if (lead) {
                setFormData({
                    customer: lead.customer || "",
                    email: lead.email || "",
                    phone: lead.phone || null,
                    company: lead.company || "",
                    lead_source: lead.lead_source || "",
                    status: lead.status || ""
                })
            } else {
                setFormData({ customer: "", email: "", phone: null, company: "", lead_source: "", status: "" });
            }
        }
    }, [isOpen, leadId, isAllLeads]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSuccess = () => {
        toast({
            title: "Update Lead Successfull",
            position: "top-right",
            isClosable: true,
            status: "success",
        });
        refreshUpdateTableData();
    };

    const handleEditLead = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.role) {
            toast({
                title: "All fields are required",
                status: "error",
                position: "top-right",
                isClosable: true,
            });
            return;
        }
        dispatch(UpdateLeadByIdAction(leadId, formData, onSuccess));
        onClose();
    };
    const leadName = isAllLeads?.find(i => i?._id === leadId);

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent maxW={"850px"}>
                <ModalHeader>{leadName?.customer}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleEditLead}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Customer</FormLabel>
                                    <Input
                                        type='text'
                                        name='customer'
                                        onChange={handleChange}
                                        value={formData.customer}
                                        placeholder="Enter Customer"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Email Address</FormLabel>
                                    <Input
                                        type='email'
                                        name='email'
                                        onChange={handleChange}
                                        value={formData.email}
                                        placeholder="Enter Email Address"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Phone</FormLabel>
                                    <Input
                                        type='number'
                                        name='phone'
                                        onChange={handleChange}
                                        value={formData.phone}
                                        placeholder="Enter Phone Number"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Company</FormLabel>
                                    <Input
                                        type='text'
                                        name='company'
                                        onChange={handleChange}
                                        value={formData.company}
                                        placeholder="Enter Company name"
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Lead Source</FormLabel>
                                    <Select name='lead_source' onChange={handleChange} value={formData.lead_source}>
                                        <option value="Website">Website</option>
                                        <option value="Organic">Organic</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>
                                    <Select name='status' onChange={handleChange} value={formData.status}>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="in progress">Organic</option>
                                        <option value="pending">Pending</option>
                                        <option value="rejected">Rejected</option>
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