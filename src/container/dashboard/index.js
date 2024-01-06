import React, {useEffect, useState} from "react";
import { Logout } from '../auth';
import {Badge, Card, Layout, Menu, Skeleton} from 'antd';
import {
    AppstoreOutlined,
    TrademarkOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import BackButton from "../../components/backButton";
import container from "./container";
import ProductsLayout from "./components/layout";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Cart from "./components/cart";
import ProductDetail from "./components/productDetail";
const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ userDetails, fetchProducts, ...rest }) => {

    const [itemCount, setItemCount] = useState({});
    const { products: productsData = {} } = rest;

    const totalItems = Object.values(itemCount).reduce((acc, singleItemCount) => {
        acc += singleItemCount;
        return acc;
    }, 0);

    useEffect(() => {
        if (!productsData.loaded && !productsData.isLoading) {
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
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Header
                    className="site-layout-background"
                    style={{
                        backgroundColor: 'red',
                        top: 0,
                        zIndex: 1,
                        height:'53px',
                        width: '100%',
                    }}
                >

                    <div style={{ display: "flex", alignItems: 'center', height: '100%', paddingTop: '-10px' }}>
                        <BackButton />
                        <div style={{ flex: 1 }} />
                        {totalItems > 0 && (
                            <div style={{ marginRight: '24px', marginTop: '10px' }}>
                                <Badge count={totalItems}>
                                    <Link to="cart">
                                        <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                    </Link>
                                </Badge>
                            </div>
                        )}
                        {!totalItems && (
                            <div style={{ marginRight: '24px', marginTop: '10px' }}>
                                <Link to="cart">
                                    <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                </Link>
                            </div>
                        )}
                        <Logout setCurrentUserState={rest.setCurrentUserState}/>
                    </div>
                </Header>
                <div style={{ flex: 1 }}>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <DashboardRouting setItemCount={setItemCount} productsData={productsData} itemCount={itemCount} />
                </Content>
            </div>
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        width: '100%',
                        flexShrink: 0,
                    }}
                >
                    Powerplay products app. contact <a>abc@support.com</a> for any queries
                </Footer>
            </Layout>
        </Layout>
    );
}

const DashboardRouting = props => {
    const { productsData, ...rest } = props;
    if (productsData.isLoading || !productsData.loaded) {
        return <Skeleton active />;
    }

    return (
        <Routes>
            <Route path="/cart" element={<Cart {...rest} products={productsData.products}/>} />
            <Route path="/product/:pid" element={<ProductDetail {...rest} products={productsData.products} />} />
            <Route path="/*" element={<ProductsLayout {...rest} products={productsData.products}/>}/>
        </Routes>
    );
};

// Add nested routing
export default container(Dashboard);

// Todo: Add Carousel of 3-4 images
// Todo: Convert to skeleton list
// Todo: Add filters, Search, sort
