import React from 'react';
import { Box, Button, Image, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import LogoIcon from "../../assets/images/logo-icon.png";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdContacts, IoIosLogOut } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
import { SiGoogleads } from "react-icons/si";
import { GoProjectRoadmap } from "react-icons/go";
import { IoCreateOutline, IoPersonSharp } from "react-icons/io5"
import { PiMicrosoftTeamsLogo, PiKanbanLight } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <Box as="nav" position="fixed" left="0" top="0" w="270px" h="100vh" bg="#ffffff">
            <VStack display="block" spacing="4" align="start">
                <Box borderBottom="1px solid #e2e7f9" bgColor="#ffffff" p="21px 25px">
                    <Link to="/dashboard" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Image src={LogoIcon} alt='logo-icon' />
                        <Text fontSize="24px" fontWeight="700" color="#000">Trickly</Text>
                    </Link>
                </Box>
                <Box overflowY="auto" h="calc(100vh - 80px)" p="20px 25px 60px">
                    <Box mb="20px">
                        <Box mb="15px">
                            <Text fontSize="14px" fontWeight={500} color="#445164">Pages</Text>
                        </Box>
                        <UnorderedList listStyleType="none">
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><IoMdContacts size={20} /> Contacts</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><RiCustomerService2Line size={20} /> Customers</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><SiGoogleads size={20} /> Leads</Link>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                    <Box mb="20px">
                        <Box mb="15px">
                            <Text fontSize="14px" fontWeight={500} color="#445164">Project Management</Text>
                        </Box>
                        <UnorderedList listStyleType="none">
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><GoProjectRoadmap size={20} /> Projects List</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><IoCreateOutline size={20} /> Create Project</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><PiKanbanLight size={20} /> Kanban Board</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><IoPersonSharp size={20} /> Clients</Link>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                    <Box mb="20px">
                        <Box mb="15px">
                            <Text fontSize="14px" fontWeight={500} color="#445164">HR Management</Text>
                        </Box>
                        <UnorderedList listStyleType="none">
                            <ListItem marginBottom="15px">
                                <Link to="/hr/users" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><FaUsers size={20} /> Users</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><PiMicrosoftTeamsLogo size={20} /> Teams</Link>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                    <Box mb="20px">
                        <Box mb="15px">
                            <Text fontSize="14px" fontWeight={500} color="#445164">Settings</Text>
                        </Box>
                        <UnorderedList listStyleType="none">
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><GoProjectRoadmap size={20} /> Account Settings</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="/dashboard" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><IoCreateOutline size={20} /> Change Password</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                {/* <Link to="javascript:;" onClick={handleLogout} style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><IoIosLogOut size={20} /> Log out</Link> */}
                                <Button
                                    onClick={handleLogout}
                                    color={"#000000"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={"6px"}
                                    bg={"unset"}
                                    _hover={{ bg: "unset" }}
                                    border={"none"}
                                    outline={"none"}
                                    p={"unset"}
                                    fontWeight={400}
                                >
                                    <IoIosLogOut size={20} /> Log out
                                </Button>

                            </ListItem>
                        </UnorderedList>
                    </Box>
                </Box>
            </VStack>
        </Box>
    )
}

export default Sidebar;