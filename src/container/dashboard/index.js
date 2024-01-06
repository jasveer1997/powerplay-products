import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import {Layout, Menu, Skeleton} from 'antd';

import container from "./container";
import ProductsLayout from "./components/layout";
import Cart from "./components/cart";
import ProductDetail from "./components/productDetail";
import {SIDEBAR_ITEMS} from "./config/constants";
import DashboardHeader from "./components/header";
import DashboardFooter from "./components/footer";
import {ContentStyle, HeaderStyle, LayoutStyle, SideStyle, StyleFooter} from "./style";

const { Header, Content, Footer, Sider } = Layout;

const DashboardRouting = props => {
    const { productsData, ...rest } = props;

    // Render loaders
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

const Dashboard = ({ userDetails, fetchProducts, ...rest }) => {

    const [itemCount, setItemCount] = useState({});
    const { products: productsData = {} } = rest;

    // fetch data
    useEffect(() => {
        if (!productsData.loaded && !productsData.isLoading) {
            fetchProducts();
        }
    }, [productsData.loaded]);

    return  (
        <Layout hasSider>
            <Sider {...SideStyle}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={SIDEBAR_ITEMS} />
            </Sider>
            <Layout className="site-layout" {...LayoutStyle}>
                <Header className="site-layout-background" {...HeaderStyle}>
                    <DashboardHeader itemCount={itemCount} setCurrentUserState={rest.setCurrentUserState}/>
                </Header>
                <div style={{ flex: 1 }}>
                    <Content {...ContentStyle}>
                        <DashboardRouting setItemCount={setItemCount} productsData={productsData} itemCount={itemCount} />
                    </Content>
                </div>
                <Footer {...StyleFooter}>
                    <DashboardFooter />
                </Footer>
            </Layout>
        </Layout>
    );
}

export default container(Dashboard);

// Todo: Add Carousel of 3-4 images
// Todo: Convert loader to skeleton list
// Todo: Add filters, Search, sort
// Todo: Add itemCount to url/ls
