import React from 'react';
import { Box, Button, Image, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import LogoIcon from "../../assets/images/logo-icon.png";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { FaTrophy } from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import { GoProjectRoadmap } from "react-icons/go";
import { IoCreateOutline, IoPersonSharp } from "react-icons/io5"
import { PiMicrosoftTeamsLogo, PiKanbanLight } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/auth/authAction';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const AfterLogout = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        dispatch(logoutAction(AfterLogout));
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
                            <Text fontSize="14px" fontWeight={500} color="#445164">Sales</Text>
                        </Box>
                        <UnorderedList listStyleType="none">
                            <ListItem marginBottom="15px">
                                <Link to="/sales/leads" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><SiGoogleads size={20} /> Leads</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="#" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><FaTrophy size={20} /> Orders</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
                                <Link to="#" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><FaTrophy size={20} /> Invoices</Link>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                    <Box mb="20px">
                        <Box mb="15px">
                            <Text fontSize="14px" fontWeight={500} color="#445164">Project Management</Text>
                        </Box>
                        <UnorderedList listStyleType="none">
                            <ListItem marginBottom="15px">
                                <Link to="/projects" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><GoProjectRoadmap size={20} /> Projects List</Link>
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
                                <Link to="/profile-settings" style={{ color: "#000000", display: "flex", alignItems: "center", gap: "6px" }}><GoProjectRoadmap size={20} /> Profile Settings</Link>
                            </ListItem>
                            <ListItem marginBottom="15px">
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