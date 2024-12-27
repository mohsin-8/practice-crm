import React, { useEffect } from 'react';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { FaBinoculars, FaBriefcase, FaCalendarAlt, FaChartLine, FaDollarSign, FaEye, FaGlobe, FaPhoneAlt, FaTrophy } from 'react-icons/fa';
import { CgWebsite } from "react-icons/cg";
import { IoMdMail } from "react-icons/io";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ClientImage from "../../assets/images/lead-detail-client.png";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { GetLeadsByIdAction } from "../../redux/leads/leadsAction";
import moment from 'moment';

const LeadDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { isGetLeadById } = useSelector((state) => state.leads);

    useEffect(() => {
        dispatch(GetLeadsByIdAction(id));
    }, [dispatch, id]);

    return (
        <>
            <Helmet>
                <title>Leads Details</title>
            </Helmet>
            <Layout>
                <Box m={"1.5rem 0px"} bgColor={"#fff"} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} p={"20px"} borderRadius={"10px"}>
                    <Text display={"flex"} alignItems={"center"} gap={"10px"} color={"rgb(96, 93, 255)"} fontSize={"26px"} fontWeight={700}><FaBinoculars /> Lead Details</Text>
                </Box>

                <Box m={"1.5rem 0px"} bgColor={"#fff"} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} p={"20px"} borderRadius={"10px"}>
                    <Tabs>
                        <TabList>
                            <Tab w={"100%"}>
                                <Flex alignItems={"center"} gap={"10px"}><FaEye /> General</Flex>
                            </Tab>
                            <Tab w={"100%"}>
                                <Flex alignItems={"center"} gap={"10px"}><FaTrophy /> Order</Flex>
                            </Tab>
                            <Tab w={"100%"}>
                                <Flex alignItems={"center"} gap={"10px"}><FaDollarSign /> Transactions</Flex>
                            </Tab>
                            <Tab w={"100%"}>
                                <Flex alignItems={"center"} gap={"10px"}><FaBriefcase /> Projects</Flex>
                            </Tab>
                            <Tab w={"100%"}>
                                <Flex alignItems={"center"} gap={"10px"}><FaChartLine /> Activities</Flex>
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                    <GridItem>
                                        <Flex gap={"20px"}>
                                            <img src={ClientImage} alt="ClientImage" />
                                            <Box>
                                                <Text fontSize={"18px"} textTransform={"capitalize"} fontWeight={700}>{isGetLeadById?.customer}</Text>
                                                <Text fontSize={"16px"} textTransform={"capitalize"} fontWeight={500}>Lead Id: {isGetLeadById?._id}</Text>
                                            </Box>
                                        </Flex>
                                    </GridItem>
                                    <GridItem>
                                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                            <GridItem>
                                                <Text fontSize={"14px"} fontWeight={500} display={"flex"} alignItems={"center"} gap={3}><IoMdMail color={"rgb(96, 93, 255)"} size={20} /> {isGetLeadById?.email}</Text>
                                            </GridItem>
                                            <GridItem>
                                                <Text fontSize={"14px"} fontWeight={500} display={"flex"} alignItems={"center"} gap={3}><FaPhoneAlt color={"rgb(96, 93, 255)"} size={20} /> {isGetLeadById?.phone}</Text>
                                            </GridItem>
                                            <GridItem>
                                                <Text fontSize={"14px"} fontWeight={500} display={"flex"} alignItems={"center"} gap={3}><FaGlobe color={"rgb(96, 93, 255)"} size={20} /> {isGetLeadById?.lead_source}</Text>
                                            </GridItem>
                                            <GridItem>
                                                <Text fontSize={"14px"} fontWeight={500} display={"flex"} alignItems={"center"} gap={3}><FaCalendarAlt color={"rgb(96, 93, 255)"} size={20} />{moment(isGetLeadById?.createdAt).format("YYYY-MM-DD hh:mm:ss a")}</Text>
                                            </GridItem>
                                            <GridItem>
                                                <Text fontSize={"14px"} fontWeight={500} display={"flex"} alignItems={"center"} gap={3}><CgWebsite color={"rgb(96, 93, 255)"} size={20} />{isGetLeadById?.company}</Text>
                                            </GridItem>
                                        </Grid>
                                    </GridItem>
                                </Grid>
                            </TabPanel>
                            <TabPanel>
                                <p>Manage your Order</p>
                            </TabPanel>
                            <TabPanel>
                                <p>Manage your tasks for Transactions</p>
                            </TabPanel>
                            <TabPanel>
                                <p>Manage your tasks for Projects</p>
                            </TabPanel>
                            <TabPanel>
                                <p>Manage your tasks for Activities</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Layout>
        </>
    )
}

export default LeadDetails;