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
import Navbar from "./components/Navbar";

const App = () => {

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


    return (
        <Layout style={{ height: "100vh" }}>
            <Row style={{ background: "white"}} justify={"center"}>
                <Navbar /> 
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
