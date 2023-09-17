import React, { useEffect, useState } from "react";
import { Col, Divider, Layout, Row, Table } from "antd";
import FormPractice from "./components/FormPractice";
import "./styles/Navbar.css";
import Navbar from "./components/Navbar";
import { Content, Footer, Header } from "antd/es/layout/layout";

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
        {
            key: "3",
            name: "Paul",
            age: 28,
            address: "St. Marie Street",
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
        <Layout style={{ background: "#f5f5f5", minHeight: "100vh" }}>
            <Header className="header">
                <Row justify={"center"}>
                    <Navbar />
                </Row>
            </Header>

            <Content className="main-section-container">
                <Row style={{ width: "100%" }} justify={"center"}>
                    <Col className="main-section" span={24} sm={{ span: 20 }}>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={{ position: ["none", "none"] }}
                        />

                        <Divider />

                        <Row className="w-100">
                            <FormPractice />
                        </Row>
                    </Col>
                </Row>
            </Content>

            <Footer></Footer>
        </Layout>
    );
};

export default App;
