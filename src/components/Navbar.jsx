import { Col, Drawer, Menu, Row } from "antd";
import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
    let [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>


            {/* <Drawer
                title="menu-drawer"
                closable={false}
                // open={open}
            >
                <Menu
                    mode="inline"
                    items={[
                        { label: "Home", key: "home" },
                        { label: "About", key: "about" },
                        { label: "Contact Us", key: "contact" },
                        { label: "Pricing", key: "pricing" },
                    ]}
                />
            </Drawer> */}
        </>
    );
}

export default Navbar;
