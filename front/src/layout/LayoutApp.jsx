import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useUser } from "../hooks";

const { Header, Sider, Content } = Layout;

const LayoutApp = ({ children }) => {
  const { user, logout } = useUser();
  return (
    <Layout>
      <Sider trigger={null}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <NavLink to="user">Mi Usuario</NavLink>,
              disabled: !user?._id,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <NavLink to={"dashboard"}>{"dashboard"}</NavLink>,
              disabled: user?.rol === "V" || !user?._id || false,
            },
            {
              key: "3",
              icon: <LogoutOutlined />,
              label: "Cerrar sesión",
              onClick: () => {
                
                logout();
              },
              disabled: !user?._id,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
