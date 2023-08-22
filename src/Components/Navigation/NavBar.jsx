import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div>
        <div className="nav-container">
          {/* <Avatar icon={"X"} size="large" /> */}
          <div className="logo-container">
            <Typography.Title level={2} className="logo">
              <Link to={"/"}>Xoin</Link>
            </Typography.Title>
          </div>

          <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to={"/cryptocurrency"}>Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />}>
              <Link to={"/exchange"}>Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to={"/news"}>News</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default NavBar;
