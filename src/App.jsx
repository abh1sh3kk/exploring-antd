import React, { useEffect, useState } from "react";
import {
    Col,
    Divider,
    Drawer,
    Layout,
    Menu,
    Row,
    Table,
} from "antd";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    FormatPainterOutlined,
} from "@ant-design/icons";
import { MenuOutlined } from "@ant-design/icons";
import FormPractice from "./components/FormPractice";
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
            <Row style={{ background: "white"}} justify={"center"}>

                <Col className="navbar" span={24} sm={{span: 20}} >

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

                </Col>
            </Row>

            <Row className="main-section">
                <Col style={{ padding: "1rem", width: "100%" }} className="" span={24} sm={{span: 20}}>
                    <Row>
                        <Col span={24}>
                            {" "}
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={{ position: ["none", "none"] }}
                            />
                        </Col>
                    </Row>

                    <Divider />

                    <Row>
                        <Col span={24} md={{ span: 16 }}>
                            <FormPractice />
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Layout>
    );
};

export default App;
