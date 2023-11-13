import { Outlet } from "react-router-dom";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link } from "react-router-dom";
import { routes } from "../routes";

const { Header, Sider, Content } = Layout;

export default function Root() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState(routes[0].key);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedPage]}>
          {routes.map((page) => (
            <Menu.Item
              key={page.key}
              icon={page.icon}
              onClick={() => setSelectedPage(page.key)}
            >
              <Link to={page.path}>{page.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
