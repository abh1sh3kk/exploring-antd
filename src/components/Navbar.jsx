import { Col, Drawer, Menu } from "antd";
import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { FormatPainterOutlined } from "@ant-design/icons";
import { MenuOutlined } from "@ant-design/icons";

function Navbar() {

    const navbarItems = [
        { label: "About", key: "about" },
        { label: "Contact Us", key: "contact" },
        { label: "Pricing", key: "pricing" },
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

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Col className="navbar" span={24} sm={{ span: 20 }}>
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
        </>
    );
}

export default Navbar;
