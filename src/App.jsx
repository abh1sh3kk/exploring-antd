import React, { useEffect, useState } from "react";
import { Col, Divider, Layout, Row, Space, Table, Tag } from "antd";
import FormPractice from "./components/FormPractice";
import "./styles/Navbar.css";
import Navbar from "./components/Navbar";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";

const App = () => {
    const data = [
        {
            key: "1",
            firstName: "John",
            lastName: "Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
        },
        {
            key: "2",
            firstName: "Walter",
            lastName: "White",
            age: 52,
            address: "Piermont Dr, Albuquerque, NM",
            tags: ["teacher", "chemist"],
        },
        {
            key: "3",
            firstName: "Joe",
            lastName: "Black",
            age: 32,
            address: "Sydney No. 1 Lake Park",
            tags: ["cool", "teacher"],
        },
        {
            key: "4",
            firstName: "Emily",
            lastName: "Johnson",
            age: 28,
            address: "Los Angeles, CA",
            tags: ["designer", "creative"],
        },
        {
            key: "5",
            firstName: "Michael",
            lastName: "Smith",
            age: 45,
            address: "Chicago, IL",
            tags: ["manager", "leader"],
        },
        {
            key: "6",
            firstName: "Sophia",
            lastName: "Davis",
            age: 27,
            address: "Houston, TX",
            tags: ["engineer", "analytical"],
        },
        {
            key: "7",
            firstName: "Oliver",
            lastName: "Johnson",
            age: 38,
            address: "San Francisco, CA",
            tags: ["programmer", "coder"],
        },
        {
            key: "8",
            firstName: "Ava",
            lastName: "Wilson",
            age: 29,
            address: "Miami, FL",
            tags: ["writer", "creative"],
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
                        <Table dataSource={data} pagination={{ position: ["none", "none"] }}>
                            <ColumnGroup title="Name">
                                <Column title="First Name" dataIndex="firstName" key="firstName" />
                                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                            </ColumnGroup>
                            <Column title="Age" dataIndex="age" key="age" />
                            <Column title="Address" dataIndex="address" key="address" />
                            <Column
                                title="Tags"
                                dataIndex="tags"
                                key="tags"
                                render={(tags) => (
                                    <>
                                        {tags.map((tag) => (
                                            <Tag color="green" key={tag}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </>
                                )}
                            />
                        </Table>
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
