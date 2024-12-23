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
    const [formData, setFormData] = useState({ customer: "", email: "", phone: "", company: "", lead_source: "" });

    const { isAllLeads } = useSelector((state) => state.leads);
    const toast = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen && leadId) {
            const lead = isAllLeads?.find(i => i?._id === leadId);
            if (lead) {
                setFormData({
                    customer: lead.customer || "",
                    email: lead.email || "",
                    phone: lead.phone ? lead.phone.toString() : "",
                    company: lead.company || "",
                    lead_source: lead.lead_source || ""
                })
            } else {
                setFormData({ customer: "", email: "", phone: null, company: "", lead_source: "" });
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

        const formattedData = {
            ...formData,
            phone: formData.phone !== "" ? Number(formData.phone) : null,
        };

        dispatch(UpdateLeadByIdAction(leadId, onSuccess, formattedData));
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
                                        <option value="Bark">Bark</option>
                                        <option value="Google">Google</option>
                                        <option value="Bing">Bing</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="Thumbtack">Thumbtack</option>
                                        <option value="Other">Other</option>
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