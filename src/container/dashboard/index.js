import React, { useEffect } from "react";
import { Logout } from '../auth';
import {Card, Layout, Menu, Skeleton} from 'antd';
import {
    AppstoreOutlined,
    TrademarkOutlined,
} from '@ant-design/icons';
import { DashboardHeader } from "./components/header";
import BackButton from "../../components/backButton";
import container from "./container";
const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
// import Header from './components/header';
// import Layout from './components/layout';

const Dashboard = ({ userDetails, fetchProducts, ...rest }) => {
    const { products: productsData = {} } = rest;

    useEffect(() => {
        if (!productsData.loaded) {
            fetchProducts();
        }
    }, [productsData.loaded]);

    const companyLogo = {
        key: String(1),
        disabled: true,
        icon: React.createElement(TrademarkOutlined),
        label: `Powerplay TM`,
    };

    const productMenuItem = {
        key: String(2),
        icon: React.createElement(AppstoreOutlined),
        label: `All products`,
    };

    const siderItems = [companyLogo, productMenuItem]; // Move to a proper map based approach later - based on config map per entry

    return  (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={siderItems} />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: 200,
                }}
            >
                <Header
                    className="site-layout-background"
                    style={{
                        backgroundColor: 'red',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        height:'53px',
                        width: '100%',
                    }}
                >

                    <div style={{ display: "flex", alignItems: 'center', height: '100%', paddingTop: '-10px' }}>
                        <BackButton />
                        <Logout setCurrentUserState={rest.setCurrentUserState}/>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    {productsData.isLoading ? <Skeleton active /> :
                        productsData.products?.map(({ title, description }) => (
                                <Card
                                    hoverable
                                    style={{
                                        width: 240,
                                    }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Meta title={title} description={description} />
                                </Card>
                            ))
                    }
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Powerplay products app. contact <a>abc@support.com</a> for any queries
                </Footer>
            </Layout>
        </Layout>
    );
}

// Add nested routing
export default container(Dashboard);

// Todo: Add Carousel of 3-4 images
// Todo: Convert to skeleton list

