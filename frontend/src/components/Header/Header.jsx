import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, HStack, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch, IoNotificationsOutline, IoChevronDown } from "react-icons/io5";
import userImage from "../../assets/images/user-image.jpg";

const Header = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (userData && userData.name) {
            setUserName(userData.name);
        }
    }, []);

    const handleOpen = () => {
        console.log("Hit Me");
    };
    return (
        <HStack justifyContent={"space-between"} bgColor={"#ffffff"} borderRadius={"15px"} p={"12px 25px"}>
            <Flex alignItems={"center"} gap={6}>
                <Button _hover={{ bg: "none" }} bg={"none"} border={"none"} outline={"none"} p={"unset"}>
                    <RxHamburgerMenu size={20} fontWeight={700} />
                </Button>

                <InputGroup w={"282px"}>
                    <Input
                        placeholder='Search Here......'
                        bgColor={"#f6f7f9"}
                        border={"1px solid #d5d9e2"}
                        p={"10px 20px"}
                        h={"46px"}
                        type='text'
                    />
                    <InputRightElement h={"100%"} p={"0 10px"}>
                        <IoSearch color="#605dff" size={20} />
                    </InputRightElement>
                </InputGroup>
            </Flex>

            <Flex alignItems={"center"} gap={6}>
                <Button
                    position="relative"
                    _hover={{ bg: "none" }}
                    bg={"none"}
                    border={"none"}
                    outline={"none"}
                    p={"unset"}
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: '10px',
                        right: '12px',
                        w: '8px',
                        h: '8px',
                        bgColor: 'red',
                        borderRadius: '50%',
                    }}
                >
                    <IoNotificationsOutline size={20} />
                </Button>

                <Box>
                    <Flex gap={2} cursor={"pointer"} onClick={handleOpen}>
                        <Image src={userImage} alt='userImage' />
                        <Text display={"flex"} gap={"0.5px"} alignItems={"center"}>{userName} <IoChevronDown /></Text>
                    </Flex>
                </Box>
            </Flex >
        </HStack >
    );
};

export default Header;