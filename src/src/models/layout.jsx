import React, { useState } from "react"
import { Layout } from "antd"
import { Routes, Route } from "react-router-dom"

import Mymenu from "./menu"
import HomePage from "./homepage"
import User from "./user/user"
import Product from "./product/product"

const { Sider, Content } = Layout

function AppLayout() {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250}>
                <Mymenu />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ padding: '24px', margin: '0', minHeight: '280' }}>
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/product" element={<Product />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AppLayout