import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    ConfigProvider,
    Divider,
    Drawer,
    Layout,
    Menu,
    Row,
    Space,
    Table,
    Typography,
} from "antd";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    FormatPainterOutlined,
} from "@ant-design/icons";
import { MenuOutlined } from "@ant-design/icons";
import FormPractice from "./components/FormPractice";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";


const App = () => {
    const menuItems = [
        { label: "Home", key: "home", icon: <MailOutlined /> },
        { label: "Profile", key: "profile", icon: <AppstoreOutlined /> },
        {
            label: "Settings",
            key: "setting",
            icon: <SettingOutlined />,
            children: [
                { label: "Setting 1", key: "setting1", icon: <SettingOutlined /> },
                { label: "Setting 2", key: "setting2", icon: <SettingOutlined /> },
            ],
        },
    ];

    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];

    const navbarItems = [
        { label: "Home", key: "home" },
        { label: "About", key: "about" },
        { label: "Contact Us", key: "contact" },
        { label: "Pricing", key: "pricing" },
    ];

    // navbar
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handleResize() {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 500) setCollapsed(false);
        else setCollapsed(true);
    }, [windowWidth]);

    // drawer
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    // sidebar collapse
    const [collapsed, setCollapsed] = useState(false);

    const collapse = () => {
        setCollapsed(true);
    };

    const unCollapse = () => {
        setCollapsed(false);
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Header style={{ background: "white", display: "flex", justifyContent: "center"}}>
                <div className="navbar dynamic-width">
                    <div>
                        <FormatPainterOutlined /> Logo
                    </div>
                    {windowWidth < 600 ? (
                        <MenuOutlined onClick={showDrawer} />
                    ) : (
                        <div className="menu-items">
                            <Menu
                                mode="horizontal"
                                items={[
                                    { label: "About", key: "about" },
                                    { label: "Contact Us", key: "contact" },
                                    { label: "Pricing", key: "pricing" },
                                ]}
                            />
                        </div>
                    )}

                    <Drawer open={open} onClose={onClose}>
                        <Menu mode="inline" items={navbarItems} />
                    </Drawer>
                </div>
            </Header>

            <Layout className="main-section">
                {/* <Sider
                    style={{ backgroundColor: "#f0f0f0" }}
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu style={{ backgroundColor: "#f0f0f0" }} mode="inline" items={menuItems} />
                </Sider> */}

                <Content style={{ padding: "1rem" }} className="dynamic-width">
                    <Row gutter={5}>
                        <Col span={24}>
                            <Table dataSource={dataSource} columns={columns} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} md={{ span: 12 }}>
                            <FormPractice />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;

// <main style={{ width: "100vw", height: "100vh" }}>
//     <Row style={{ height: "100%"}}>
//         <Col sm={{ span: 6 }} style={{ background: "#1677ff" }} span={24}>
//             I am a sidebar
//         </Col>
//         <Col sm={{ span: 18 }} style={{ background: "#4d96fc" }} span={24}>
//             I am the main section
//         </Col>
//     </Row>
// </main>
