import React from 'react';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { FaBinoculars, FaBriefcase, FaChartLine, FaDollarSign, FaEye, FaTrophy } from 'react-icons/fa';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ClientImage from "../../assets/images/lead-detail-client.png";

const LeadDetails = () => {
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
                                        <img src={ClientImage} alt="" />
                                    </GridItem>
                                    <GridItem>
                                        Test
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