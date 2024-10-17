import React from 'react';
import { Text } from '@chakra-ui/react';
import { Helmet } from "react-helmet-async";
import Layout from '../../components/Layout';

const Dashboard = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Layout>
                <Text>Dashboard</Text>
            </Layout>
        </div>
    );
};

export default Dashboard;