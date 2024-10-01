import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

const Layout = ({ children }) => {
    return (
        <Flex>
            <Sidebar />
            <Box ml="270px" p="4" bg="gray.50" minH="100vh" w="calc(100% - 250px)">
                <Header />
                {children}
            </Box>
        </Flex>
    );
};

export default Layout;